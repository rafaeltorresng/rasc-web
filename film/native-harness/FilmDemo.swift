// Appended only to a throwaway native source snapshot, never the production project.
#if RASC_FILM_DEMO && !DEBUG
#error("RASC_FILM_DEMO is restricted to explicit Debug demonstration builds")
#endif
#if RASC_FILM_DEMO && DEBUG
struct FilmDemoScenario: Decodable, Sendable {
    struct SyntheticNote: Decodable, Sendable { let content: String; let kept: Bool }
    let original: String
    let suggested: String
    let refiningSeconds: Double
    let syntheticNotes: [SyntheticNote]

    static let bundleID = "com.rafaeltorres.rasc.filmdemo20261020"

    static func load() throws -> (Self, URL) {
        guard Bundle.main.bundleIdentifier == bundleID,
              let flag = CommandLine.arguments.firstIndex(of: "--film-config"),
              flag + 1 < CommandLine.arguments.count else { throw RefinementError.providerFailure }
        let config = URL(fileURLWithPath: CommandLine.arguments[flag + 1]).resolvingSymlinksInPath()
        let root = config.deletingLastPathComponent()
        // No configurable DB path, no default-store fallback, no personal-note import.
        let allowedParent = URL(fileURLWithPath: "/private/tmp", isDirectory: true).resolvingSymlinksInPath()
        guard root.deletingLastPathComponent().path == allowedParent.path,
              root.lastPathComponent.hasPrefix("rasc-film-harness-"),
              try String(contentsOf: root.appendingPathComponent(".demo-only"), encoding: .utf8) == "rasc-film-demo-only\n"
        else { throw RefinementError.providerFailure }
        let scenario = try JSONDecoder().decode(Self.self, from: Data(contentsOf: config))
        guard !scenario.original.isEmpty, !scenario.suggested.isEmpty,
              scenario.original != scenario.suggested,
              scenario.refiningSeconds.isFinite,
              (0.5...8).contains(scenario.refiningSeconds) else { throw RefinementError.invalidOutput }
        let store = root.appendingPathComponent("store", isDirectory: true).resolvingSymlinksInPath()
        guard store.path == root.path + "/store" else { throw RefinementError.providerFailure }
        try FileManager.default.createDirectory(at: store, withIntermediateDirectories: true)
        return (scenario, store.appendingPathComponent("notes.sqlite"))
    }

    func seed(_ repository: NoteRepository, at databaseURL: URL) async throws {
        let marker = databaseURL.deletingLastPathComponent().appendingPathComponent("seeded")
        guard !FileManager.default.fileExists(atPath: marker.path) else { return }
        for sample in syntheticNotes {
            let note = try await repository.createScratch(content: sample.content)
            if sample.kept { _ = try await repository.keep(id: note.id) }
        }
        try Data("synthetic-only\n".utf8).write(to: marker, options: .atomic)
    }
}

/// Supplies a scripted provider response, not a model result. Native session owns
/// refinement state, cancellation, preview, selection, acceptance and persistence.
struct FilmRefinementProvider: RefinementProvider {
    let scenario: FilmDemoScenario
    let metadata = RefinementMetadata(provider: "illustrative-film-demo", modelIdentifier: "scripted-no-inference", promptVersion: "film-scenario-v1")
    func availability(for request: RefinementRequest) async -> RefinementAvailability { .available }
    func refine(_ request: RefinementRequest) async throws -> RefinementResult {
        guard request.scope == .wholeNote, request.inputText == scenario.original else {
            throw RefinementError.invalidOutput
        }
        try await Task.sleep(for: .seconds(scenario.refiningSeconds))
        try Task.checkCancellation()
        return .init(decision: .changed, kind: .idea, text: scenario.suggested)
    }
}
#endif
