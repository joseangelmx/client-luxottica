const endpoint = "https://localhost:7180/";
const endpointSorting = "https://localhost:7137/"

document.getElementById("login-button").addEventListener("click", function() {
    const username = document.getElementById("emailLog").value;
    const password = document.getElementById("passwordLog").value;

    const loginData = {
        username: username,
        password: password
    };

    fetch(endpoint + "api/auth/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Inicio de sesión fallido");
        }
        return response.json(); // Parsear la respuesta como JSON
    })
    .then(data => {
        const token = data[0].Token; // Obtener el token de la respuesta JSON
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 día

        // Guardar el token en el almacenamiento local (localStorage, sessionStorage) o cookie
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; SameSite=None; Secure; path=/`;
        alert("Sesión iniciada");
        location.reload();
    })
    .catch(error => {
        console.error("Error:", error);
        // Aquí podrías mostrar un mensaje de error en tu página
    });
});


function newToteInformation() {
    const camIdV = document.getElementById("camIdNewTote").value;
    const trackingIdV = document.getElementById("trackingIdNewTote").value;
    const toteLpnV = document.getElementById("toteLpnNewTote").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'api/ToteInformation/receive-flow/new-tote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseToteLpn").textContent = data.tote_LPN;
        document.getElementById("responseVirtualTote").textContent = data.virtual_Tote;
        document.getElementById("responseZoneId").textContent = data.zone_Id;
        document.getElementById("responseTimestamp").textContent = data.resp_Timestamp;
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}

function DivertTote() {
    const camIdV = document.getElementById("camIdDivert").value;
    const trackingIdV = document.getElementById("trackingIdDivert").value;
    const toteLpnV = document.getElementById("toteLpnDivert").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivert").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivert").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCode").textContent = data.divert_code;
        document.getElementById("responseTrackingId").innerText = data.tracking_id;
        countdown();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}

function DivertToteSingle() {
    const camIdV = document.getElementById("camIdDivertSingle").value;
    const trackingIdV = document.getElementById("trackingIdDivertSingle").value;
    const toteLpnV = document.getElementById("toteLpnDivertSingle").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertSingle").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertSingle").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/singleTote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeSingle").textContent = data.divert_code;
        document.getElementById("responseTrackingIdSingle").textContent = data.tracking_id;
        countdownSingle();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertToteMulti() {
    const camIdV = document.getElementById("camIdDivertMulti").value;
    const trackingIdV = document.getElementById("trackingIdDivertMulti").value;
    const toteLpnV = document.getElementById("toteLpnDivertMulti").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertMulti").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertMulti").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/multiTote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeMulti").textContent = data.divert_code;
        document.getElementById("responseTrackingIdMulti").textContent = data.tracking_id;
        countdownMulti();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertCam11() {
    const camIdV = document.getElementById("camIdDivertCam11").value;
    const trackingIdV = document.getElementById("trackingIdDivertCam11").value;
    const toteLpnV = document.getElementById("toteLpnDivertCam11").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertCam11").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertCam11").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/TotesCam11', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeCam11").textContent = data.divert_code;
        document.getElementById("responseTrackingIdCam11").textContent = data.tracking_id;
        countdownCam11();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertCam14() {
    const camIdV = document.getElementById("camIdDivertCam14").value;
    const trackingIdV = document.getElementById("trackingIdDivertCam14").value;
    const toteLpnV = document.getElementById("toteLpnDivertCam14").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertCam14").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertCam14").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/multiToteCam14', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeCam14").textContent = data.divert_code;
        document.getElementById("responseTrackingIdCam14").textContent = data.tracking_id;
        countdownCam14();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertConfirmCam14() {
    const camIdV = document.getElementById("camIdDivertConfirmCam14").value;
    const trackingIdV = document.getElementById("trackingIdDivertConfirmCam14").value;
    const DivertCodeV = document.getElementById("divertCodeConfirmCam14").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        divertCode: DivertCodeV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/confirmation/Cam14', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        document.getElementById("confirmMessageCam14").style.display = "block";
        setTimeout(function() {
            document.getElementById("confirmMessageCam14").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertCam15() {
    const camIdV = document.getElementById("camIdDivertCam15").value;
    const trackingIdV = document.getElementById("trackingIdDivertCam15").value;
    const toteLpnV = document.getElementById("toteLpnDivertCam15").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertCam15").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertCam15").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/multiToteCam15', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeCam15").textContent = data.divert_code;
        document.getElementById("responseTrackingIdCam15").textContent = data.tracking_id;
        countdownCam15();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertConfirmCam15() {
    const camIdV = document.getElementById("camIdDivertConfirmCam15").value;
    const trackingIdV = document.getElementById("trackingIdDivertConfirmCam15").value;
    const DivertCodeV = document.getElementById("divertCodeConfirmCam15").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        divertCode: DivertCodeV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/confirmation/Cam15', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        document.getElementById("confirmMessageCam15").style.display = "block";
        setTimeout(function() {
            document.getElementById("confirmMessageCam15").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertCam16() {
    const camIdV = document.getElementById("camIdDivertCam16").value;
    const trackingIdV = document.getElementById("trackingIdDivertCam16").value;
    const toteLpnV = document.getElementById("toteLpnDivertCam16").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertCam16").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertCam16").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/multiToteCam16', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeCam16").textContent = data.divert_code;
        document.getElementById("responseTrackingIdCam16").textContent = data.tracking_id;
        countdownCam16();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertConfirmCam16() {
    const camIdV = document.getElementById("camIdDivertConfirmCam16").value;
    const trackingIdV = document.getElementById("trackingIdDivertConfirmCam16").value;
    const DivertCodeV = document.getElementById("divertCodeConfirmCam16").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        divertCode: DivertCodeV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/confirmation/Cam16', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        document.getElementById("confirmMessageCam16").style.display = "block";
        setTimeout(function() {
            document.getElementById("confirmMessageCam16").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertCam17() {
    const camIdV = document.getElementById("camIdDivertCam17").value;
    const trackingIdV = document.getElementById("trackingIdDivertCam17").value;
    const toteLpnV = document.getElementById("toteLpnDivertCam17").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertCam17").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertCam17").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/divert/multiToteCam17', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeCam17").textContent = data.divert_code;
        document.getElementById("responseTrackingIdCam17").textContent = data.tracking_id;
        countdownCam17();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertConfirmCam17() {
    const camIdV = document.getElementById("camIdDivertConfirmCam17").value;
    const trackingIdV = document.getElementById("trackingIdDivertConfirmCam17").value;
    const DivertCodeV = document.getElementById("divertCodeConfirmCam17").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        divertCode: DivertCodeV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/confirmation/Cam17', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        document.getElementById("confirmMessageCam17").style.display = "block";
        setTimeout(function() {
            document.getElementById("confirmMessageCam17").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function BorderPicking() {
    const camIdV = document.getElementById("camIdDivertBorder").value;
    const trackingIdV = document.getElementById("trackingIdDivertBorder").value;
    const toteLpnV = document.getElementById("toteLpnDivertBorder").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertBorder").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertBorder").value;

    const data = {
        camId: camIdV,
        toteLPN: toteLpnV,
        trackingId: trackingIdV,
        scanner_N_lane_w_status: scannerNLaneWStatusV,
        scanner_N_lane_w_full: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'api/ToteInformation/receive-flow/borderPicking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeBorder").textContent = data.divert_code;
        document.getElementById("responseTrackingIdBorder").textContent = data.tracking_id;
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function TransferInbound() {
    const camIdV = document.getElementById("camIdDivertTransfer").value;
    const trackingIdV = document.getElementById("trackingIdDivertTransfer").value;
    const toteLpnV = document.getElementById("toteLpnDivertTransfer").value;
    const scannerNLaneWStatusV = document.getElementById("scannerNLaneWStatusDivertTransfer").value;
    const scannerNLaneWFullV = document.getElementById("scannerNLaneWFullDivertTransfer").value;

    const data = {
        camId: camIdV,
        trackingId: trackingIdV,
        toteLpn: toteLpnV,
        scannerNLaneWStatus: scannerNLaneWStatusV,
        scannerNLaneWFull: scannerNLaneWFullV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'transfer-inboud/check-tote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseDivertCodeTransfer").textContent = data.divert_code;
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
function DivertConfirm() {
    const camIdV = document.getElementById("camIdDivertConfirm").value;
    const trackingIdV = document.getElementById("trackingIdDivertConfirm").value;
    const DivertCodeV = document.getElementById("divertCodeConfirm").value;

    const data = {
        camId: camIdV,
        trakingId: trackingIdV,
        divertCode: DivertCodeV
    };

    const token = getTokenFromCookie(); // Asegúrate de tener una función para obtener el token

    fetch(endpoint + 'divert-flow/confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al recibir la respuesta');
        }
        document.getElementById("confirmMessage").style.display = "block";
        setTimeout(function() {
            document.getElementById("confirmMessage").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}


function generateRandomNumberWithDigits(numDigits) {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function desaparecerAlerta() {
    document.getElementById("confirmMessage").style.display = "none" 
  }

  function getTokenFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
}

function newTote() {
    let toteLpn;
    toteLpn = "T"+generateRandomNumberWithDigits(5); 
    document.getElementById("toteGenerated").value = toteLpn;
}

function countdown() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabel');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }
  
    tick(); // Inicia la cuenta regresiva
  }
  function countdownSingle() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelSingle');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }
  
    tick(); // Inicia la cuenta regresiva
  }

  function countdownMulti() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelMulti');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
 
    }
    tick();
}
    function countdownCam11() {
        let seconds = 10;
        const countdownLabel = document.getElementById('countdownLabelCam11');
      
        function tick() {
          countdownLabel.textContent = seconds;
          seconds--;
      
          if (seconds >= 0) {
            setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
          } else {
            countdownLabel.textContent = '¡Tiempo terminado!';
            // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
          }
        }
  
    tick(); // Inicia la cuenta regresiva
  }
  function countdownCam14() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelCam14');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }

tick(); // Inicia la cuenta regresiva
}
function countdownCam15() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelCam15');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }

tick(); // Inicia la cuenta regresiva
}
function countdownCam16() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelCam16');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }

tick(); // Inicia la cuenta regresiva
}
function countdownCam17() {
    let seconds = 10;
    const countdownLabel = document.getElementById('countdownLabelCam17');
  
    function tick() {
      countdownLabel.textContent = seconds;
      seconds--;
  
      if (seconds >= 0) {
        setTimeout(tick, 1000); // Llama a la función tick después de 1 segundo (1000 milisegundos)
      } else {
        countdownLabel.textContent = '¡Tiempo terminado!';
        // Aquí podrías ejecutar alguna acción adicional una vez que termine la cuenta regresiva
      }
    }

tick(); // Inicia la cuenta regresiva
}