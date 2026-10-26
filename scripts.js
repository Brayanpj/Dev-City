
const nome = document.querySelector(".nome");
const person = document.querySelector(".person");

let streamCamera = null;
let fotoCapturada = false;

function escolhaPersonagem(nomePersonagem, imagemPersonagem, corPerson) {
  console.log(nomePersonagem, imagemPersonagem);

 const campoNome = document.getElementById("campoNome");
  nome.textContent = nomePersonagem;
  person.src = imagemPersonagem;
  nome.style.color = corPerson;

  // Remove o estilo específico da selfie ao escolher um personagem.
  person.classList.remove("foto");
}

async function abrirCamera() {
    const modal = document.getElementById("cameraModal");
    const video = document.getElementById("videoCamera");
    const erroCamera = document.getElementById("erroCamera");
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("camera-indisponivel");
    }

    streamCamera = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });

        video.srcObject = streamCamera;
        modal.hidden = false;

        await video.play();

        erroCamera.textContent = "";
    } catch (erro) {
        console.error("Erro ao abrir a câmera:", erro);
        erroCamera.textContent = "Não foi possível abrir a câmera.";
    }
}
  
function tirarFoto() {
    const video = document.getElementById("videoCamera");
    const canvas = document.getElementById("canvasFoto"); 

    if (!video.videoWidth || !video.videoHeight) {
        alert("Aguarde a câmera iniciar antes de tirar a foto.");
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // Espelha a foto, como em uma câmera frontal.
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const foto = canvas.toDataURL("image/jpeg", 0.9);

    person.src = foto;
    person.classList.add("foto");

    const campoNome = document.getElementById("campoNome"); 
    nome.textContent = campoNome.value.trim() || "Você";
    nome.imput = "Nome";
    nome.style.color = "#ffffff";

    fecharCamera();
}

function fecharCamera() {
    if (streamCamera) {
        streamCamera.getTracks().forEach(track => track.stop());
        streamCamera = null;
    }

    const video = document.getElementById("videoCamera");
    const modal = document.getElementById("cameraModal");

    if (video) {
        video.srcObject = null;
    }

    if (modal) {
        modal.hidden = true;
    } 
    
}


