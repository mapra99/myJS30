const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play();
    })
    .catch(e => {
      console.error(`Something went wrong: ${e}`)
    })
}

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width
  canvas.height= height

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
  }, 10)
}

const takePhoto = () => {
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/png')

  const anchorEl = document.createElement('a')
  anchorEl.href = data
  anchorEl.setAttribute('download', 'image')

  const imgEl = document.createElement('img')
  imgEl.src = data

  anchorEl.appendChild(imgEl)
  strip.prepend(anchorEl)
}

getVideo()
video.addEventListener('canplay', paintToCanvas)
canvas.addEventListener('click', takePhoto)
