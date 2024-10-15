window.addEventListener("load", function() {
    const form = document.getElementById("formulario")
    const titleName = document.querySelector(".error-name")
    const email = document.querySelector("#email")
    const name = document.querySelector("#nombre")
    const titleMail = document.querySelector(".error-email")
    const dropArea = document.querySelector(".dragArea")
    const dragText = dropArea.querySelector("h4")
    const button = dropArea.querySelector("button")
    const input = dropArea.querySelector("#input-file")
    var selectedFiles = [];
    var fileErrors = [];

    form.addEventListener("submit", (e) => {

        let errors = []


        if (name.value.length < 6) {
            name.style.border = "1px solid red"
            errors.push("El nombre debe poseer más caracteres");
        };

        if (name.value == "") {
            name.style.border = "1px solid red"
            errors.push("El nombre debe poseer más caracteres");
        };

        if (email.value == "") {
            email.style.border = "1px solid red"
            errors.push("El email debe poseer más caracteres")
        };

        if (!email.value.includes("@")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo electrónico válido por favor")

        }

        if (name.value.includes("/")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un nombre válido por favor")

        }

        if (email.value.includes("/")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo elctrónico válido por favor")
        }


        if (email.value.includes("||")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo electrónico válido por favor")
        }

        if (email.value.includes("|")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo electrónico válido por favor")
        }

        if (email.value.includes("%")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo electrónico válido por favor")
        }

        if (email.value.includes("#")) {
            email.style.border = "1px solid red"
            errors.push("Ingrese un correo electrónico válido por favor")
        }


        name.addEventListener("keyup", (e) => {

            if (name.value.length > 0) {

                name.style.border = "1px solid red"


            }
        })
        name.addEventListener("keyup", function(e) {
            if (name.value.length > 5) {
                name.style.border = "2px solid green"
                titleName.innerHTML = " "
            }

        })


        email.addEventListener("keyup", function(e) {
            if (email.value.length > 0 || !(email.value.includes("@"))) {
                email.style.border = "1px solid red"
                errors.push("El mail debe contener más caracteres")
            }
        })

        email.addEventListener("keyup", function(e) {
            if (email.value.length > 5) {
                email.style.border = "2px solid green"
                titleMail.innerHTML = " "
            }
        })

        if (errors.length > 0) {
            e.preventDefault();

            alert("Revise los errores para poder continuar")
            alert(errors); //TODO: mostrar un solo mensaje.
        }
        document.getElementById('uploaded_files').value= JSON.stringify(selectedFiles)
    })
    console.log(input)

    //DRAG AND DROP

    button.addEventListener("click", (e) => {
        e.preventDefault()
        input.click()
    })

    input.addEventListener("change", (e) => {
        // files = input.files
        // showFiles(files)
        dropArea.classList.add("active")
        processFiles(input.files)
        dropArea.classList.remove("active")
    })



    //cuando los archivos están encima

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault()
        dropArea.classList.add("active")

    })

    //cuando te vas

    dropArea.addEventListener("dragleave", (e) => {
        e.preventDefault()
        dropArea.classList.remove("active")
    })



    //cuando lo soltas
    dropArea.addEventListener("drop", (e) => {
        e.preventDefault()
        files = e.dataTransfer.files
        input.files = files
        processFiles(files)
        dropArea.classList.remove("active")
    })

    function processFiles(files)
    {
        fileErrors = [];
        document.querySelector("#preview").innerHTML = "";
        const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

        for (let i = 0; i < files.length; i++) {
            let docType = files[i].type;
            if (validExtensions.includes(docType)) {
                selectedFiles.push(files[i]);
            } else {
                fileErrors.push(files[i].name)
            }
        }
        showFiles(selectedFiles);
    }

    console.log(input.value) //TODO: poner cartel

    // function showFiles() {
    //   document.querySelector("#preview").innerHTML = ""
    //   if (files.length == undefined) {
    //     processFile(files)
    //   } else {
    //     for (let file of files) {
    //       processFile(file)
    //     }
    //   }
    // }

    function showFiles(files) {
        for (let file of files) {
            processFile(file);
        }

        if (fileErrors.length > 0) {
            let message = fileErrors.join(', ') + 'no son imagenes validas'
            alert(message)
        }
    }


    // function processFile(file) {
    //   // const docType = file.type
    //   // const validExtensions = ["image/jpeg", "image/jpg", "image/png"]

    //   if (validExtensions.includes(docType)) {
    //     const fileReader = new FileReader()
    //     const id = `file-${Math.random().toString(32).substring(7)}`

    //     fileReader.addEventListener("load", (e) => {
    //       const fileUrl = fileReader.result
    //       const image = `    <div id="${id}" class="file-container">
    //            <div class="status"> 
    //            <img style="width: 100px;display: block;margin-bottom: 10px;" src="${fileUrl}" />
    //             <span> ${file.name}</span>
    //             </div>
    //      </div>`
    //       const html = document.querySelector("#preview").innerHTML
    //       document.querySelector("#preview").innerHTML = image + html
    //     })

    //     fileReader.readAsDataURL(file)

    //   } else {
    //     alert("No se ha ingresado una imagen válida")
    //   }
    // }

    function processFile(file) {
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener("load", (e) => {
            const fileUrl = fileReader.result;
            const image = `
                  <div id="${id}" class="file-container">
                    <div class="status"> 
                      <img style="width: 100px; display: block; margin-bottom: 10px;" src="${fileUrl}" />
                      <span>${file.name}</span>
                    </div>
                  </div>
                `;
            // Append the new image to the preview container
            const previewContainer = document.querySelector("#preview");
            previewContainer.innerHTML += image;
        });
        fileReader.readAsDataURL(file);
    }

    // You can remove selected files from the preview by their associated id
    function removeFile(id) {
        const previewContainer = document.querySelector("#preview");
        const fileToRemove = document.querySelector(`#${id}`);
        previewContainer.removeChild(fileToRemove);

        // Remove the file from the selectedFiles array
        const index = selectedFiles.findIndex((fileObject) => fileObject.id === id);
        if (index !== -1) {
            selectedFiles.splice(index, 1);
        }
    }
})