import { workspaceExample } from '../content/fixtures';
import MacClock from './MacClock';
import Icon from '../ui/Icon';

type WorkspaceGlyph = 'compose' | 'plugins' | 'folder' | 'chevron' | 'plus' | 'arrow' | 'copy';

// Shared interface glyphs; source identity marks and native status icons stay intact.
function Glyph({ name }: { name: WorkspaceGlyph }) {
  return <Icon name={name === 'arrow' ? 'arrowUp' : name} className={`workspace-glyph workspace-glyph--${name}`} />;
}

function MacMenuBar() {
  return <div className="mac-menu">
    <div className="mac-menu__menus">
      <span className="menu-mark menu-mark--apple" />
      <span className="mac-menu__app">ChatGPT</span>
      <span className="mac-menu__item">File</span>
      <span className="mac-menu__item">Edit</span>
      <span className="mac-menu__item">View</span>
      <span className="mac-menu__item mac-menu__item--extra">Window</span>
      <span className="mac-menu__item mac-menu__item--extra">Help</span>
    </div>
    <div className="mac-menu__status">
      <span className="mac-menu__icon mac-menu__icon--optional"><span className="menu-mark menu-mark--chatgpt" /></span>
      <span className="mac-menu__icon mac-menu__icon--optional"><span className="menu-mark menu-mark--superwhisper" /></span>
      <span className="mac-menu__icon"><span className="menu-mark menu-mark--rasc" /></span>
      <span className="mac-menu__icon"><span className="menu-battery"><span className="menu-battery__outline" /><span className="menu-battery__level" /><span className="menu-battery__cap" /></span></span>
      <span className="mac-menu__icon"><span className="menu-mark menu-mark--wifi" /></span>
      <span className="mac-menu__icon mac-menu__icon--controls"><span className="menu-mark menu-mark--controls" /></span>
      <MacClock />
    </div>
  </div>;
}

function ChatWorkspace() {
  return <div className="chat-workspace">
    <aside className="chat-sidebar">
      <div className="chat-sidebar__titlebar"><div className="traffic-lights"><i /><i /><i /></div><span className="chat-sidebar-toggle"><Icon name="sidebar" /></span></div>
      <div className="chat-sidebar__identity"><span>ChatGPT</span><Glyph name="chevron" /></div>
      <div className="chat-sidebar__nav"><span><Glyph name="compose" />New chat</span><span><Glyph name="folder" />Projects</span><span><Glyph name="plugins" />Plugins</span></div>
      <div className="chat-sidebar__projects"><p>Pinned</p><span><Glyph name="folder" />{workspaceExample.project}<Glyph name="chevron" /></span><span className="chat-sidebar__conversation">{workspaceExample.title}</span></div>
      <div className="chat-sidebar__recent"><p>Chats</p>{workspaceExample.otherChats.map(title => <span key={title}>{title}</span>)}</div>
    </aside>
    <div className="chat-main">
      <div className="chat-main__toolbar"><span className="chat-main__title">{workspaceExample.title}</span><span className="chat-main__product">ChatGPT<Glyph name="chevron" /></span><span className="chat-main__ellipsis"><Icon name="more" /></span></div>
      <div className="chat-thread">
        <p className="chat-thread__project"><Glyph name="folder" />{workspaceExample.project}</p>
        <div className="chat-message chat-message--user"><p>{workspaceExample.prompt}</p></div>
        <div className="chat-message chat-message--assistant"><p>{workspaceExample.reply}</p><ul>{workspaceExample.suggestions.map(item => <li key={item}>{item}</li>)}</ul><div className="chat-message__actions"><Glyph name="copy" /><Icon name="replay" /></div></div>
      </div>
      <div className="chat-composer"><span>Message ChatGPT</span><div className="chat-composer__tools"><Glyph name="plus" /><span className="chat-composer__send"><Glyph name="arrow" /></span></div></div>
    </div>
  </div>;
}

export default function WorkContext({ desktop = true }: { desktop?: boolean }) {
  // Work remains static; only the local clock updates. No fake focus or live AI.
  return <div className={`mac-work${desktop ? '' : ' mac-work--application'}`} aria-hidden="true">{desktop && <MacMenuBar />}<ChatWorkspace /></div>;
}
