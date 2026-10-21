#!/bin/sh
set -eu
npx remotion render src/index.ts Rasc-Native-Demo-Complete out/rasc-native-demo-complete-master.mov --codec=prores --prores-profile=4444 --pixel-format=yuv444p10le --audio-codec=pcm-16 --image-format=png --concurrency=1 --browser-executable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
# Embed the deterministic score directly, preserving the master video stream.
ffmpeg -hide_banner -loglevel error -y -i out/rasc-native-demo-complete-master.mov -i public/native-demo/audio/complete.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a pcm_s16le out/native-demo-audio-master.mov
mv out/native-demo-audio-master.mov out/rasc-native-demo-complete-master.mov
for rate in 60 30; do
 ffmpeg -hide_banner -loglevel error -y -i out/rasc-native-demo-complete-master.mov -vf "fps=$rate,scale=in_range=tv:out_range=tv:out_color_matrix=bt709" -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:v libx264 -preset slow -crf 15 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "out/rasc-native-demo-complete-${rate}fps.mp4"
 ffmpeg -hide_banner -loglevel error -y -i "out/rasc-native-demo-complete-${rate}fps.mp4" -an -c:v copy -movflags +faststart "out/rasc-native-demo-complete-${rate}fps-silent.mp4"
done
ffmpeg -hide_banner -loglevel error -y -sseof -0.2 -i out/rasc-native-demo-complete-master.mov -frames:v 1 out/rasc-native-demo-complete-poster.png
