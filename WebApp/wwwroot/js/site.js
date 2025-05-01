document.addEventListener('DOMContentLoaded', () => {
    const previewSize = 150


    // open modal
    const modalButtons = document.querySelectorAll('[data-modal="true"]')
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalTarget = button.getAttribute('data-target')
            const modal = document.querySelector(modalTarget)

            if (modal)
                modal.style.display = 'flex';
        })
    })

    // close modal
    const closeButtons = document.querySelectorAll('[data-close="true"]')
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            if (modal) {
                modal.style.display = 'none'

                // clear formdata
                modal.querySelectorAll('form').forEach(form => {
                    form.reset()

                    const imagePreview = form.querySelector('.image-preview')
                    if (imagePreview)
                        imagePreview.src = ''

                    const imagePreviewer = form.querySelector('.image-previewer')
                    if (imagePreviewer)
                        imagePreviewer.classList.remove('selected')
                })
            }
        })
    })

    // handle image-previewer
    document.querySelectorAll('.image-previewer').forEach(previewer => {
        const fileInput = previewer.querySelector('input[type="file"]')
        const imagePreview = previewer.querySelector('.image-preview')

        previewer.addEventListener('click', () => fileInput.click())

        fileInput.addEventListener('change', ({ target: { files } }) => {
            const file = files[0]
            if (file)
                processImage(file, imagePreview, previewer, previewSize)
        })
    })





    //handle submit forms
    const forms = document.querySelectorAll('#modalForm');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrorMessages(form);

            const formData = new FormData(form);



            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    const modal = form.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none';
                        window.location.reload();
                    }
                } else if (res.status === 400 && data.errors) {
                    Object.keys(data.errors).forEach(key => {
                        const input = form.querySelector(`[name="${key}"]`);
                        if (input) input.classList.add('input-validation-error');

                        const span = form.querySelector(`[data-valmsg-for="${key}"]`);
                        if (span) {
                            span.innerText = data.errors[key].join('\n');
                            span.classList.add('field-validation-error');
                        }
                    });
                }
            } catch (err) {
                console.log('error submitting the form', err);
            }
        });
    });



})



function clearErrorMessages(form) {
    form.querySelectorAll('[data-val="true"]').forEach(input => {
        input.classList.remove('input-validation-error')
    })

    form.querySelectorAll('[data-valmsg-form]').forEach(span => {
        span.innerText = ''
        span.classList.remove('field-validation-error')
    })
}




async function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onerror = () => reject(new Error("Failed to load file."))
        reader.onload = (e) => {
            const img = new Image()
            img.onerror = () => reject(new Error("Failed to load image"))
            img.onload = () => resolve(img)
            img.src = e.target.value.result
        }

        reader.readAsDataURL(file)
    })
}


async function processImage(file, imagePreview, previewer, previewSize = 150) {
    try {
        const img = await loadImage(file)
        const canvas = document.createElement('canvas')
        canvas.width = previewSize
        canvas.height = previewSize

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, previewSize, previewSize)
        imagePreview.src = canvas.toDataURL('image/jpeg')
        previewer.classList.add('selected')

    }
    catch (error) {
        console.error('Failed on image-processing', error)
    }
}


// dropdowns


const dropdowns = document.querySelectorAll('[data-type="dropdown"]')

document.addEventListener('click', function (event) {
    let clickedDropdown = null

    dropdowns.forEach(dropdown => {
        const targetId = dropdown.getAttribute('data-target')
        const targetElement = document.querySelector(targetId)

        if (dropdown.contains(event.target)) {
            clickedDropdown = targetElement

            document.querySelectorAll('.dropdown.dropdown-show').forEach(openDropdown => {
                if (openDropdown !== targetElement) {
                    openDropdown.classList.remove('dropdown-show')
                }
            })

            targetElement.classList.toggle('dropdown-show')
        }
    })

    if (!clickedDropdown && !event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.dropdown-show').forEach(openDropdown => {
            openDropdown.classList.remove('dropdown-show')
        })
    }
})


// delete

// Chat-GPT. denna kod genereras av Chat-GPT 4o. Den här koden raderar ett projekt om man trycker på "delete project" knappen. När man trycker på knappen så får man en bekräftelseruta om man är säker på att vilja ta bort projektet, klickar man "OK" så skickas projektet till servern så att den raderas från databasen. Klickar man i "avbryt" så händer det inget och projketet kommer fortsätta att finnas kvar på sidan.

document.querySelectorAll('.dropdown-action.remove').forEach(button => {
    button.addEventListener('click', async (e) => {
        const projectId = e.target.closest('button').getAttribute('data-id');

        if (confirm('Are you sure that you want to delete this project?')) {
            const res = await fetch(`/Projects/Delete/${projectId}`, {
                method: 'POST'
            });

            const data = await res.json();

            if (res.ok && data.success) {
             
                window.location.reload();
            } else {
                alert('Failed to delete project.');
            }
        }
    });
});


document.querySelectorAll('.dropdown-action.edit').forEach(button => {
    button.addEventListener('click', async (e) => {
        const projectId = e.target.closest('button').getAttribute('data-id');
        const modal = document.querySelector('#editProjectModal');
        const form = modal.querySelector('#modalForm');

        try {
            const res = await fetch(`/Projects/GetProject/${projectId}`);
            const data = await res.json();

            if (res.ok && data) {
                form.querySelector('[name="Id"]').value = data.id;
                form.querySelector('[name="ProjectName"]').value = data.projectName;
                form.querySelector('[name="ClientName"]').value = data.clientName;
                form.querySelector('[name="Description"]').value = data.description;
                form.querySelector('[name="StartDate"]').value = data.startDate;
                form.querySelector('[name="EndDate"]').value = data.endDate;
                form.querySelector('[name="Budget"]').value = data.budget;

                modal.style.display = 'flex';
            } else {
                alert("Could not load project");
            }
        } catch (err) {
            console.error("Failed to load project:", err);
        }
    });
});

