import {MainContainer, VideoContainer, Title } from "src/assets/styles/Home/Video/video.style"

export default function Video() {
  return (
    <>
    <MainContainer>
      <Title>Confira o vídeo de apresentação do app:</Title>
      <VideoContainer width="560" height="315" src="https://www.youtube.com/embed/hMy5Mm7fpf8?si=WvrvBlF8U_wpfuNE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></VideoContainer>
    </MainContainer>
    </>
  )
}