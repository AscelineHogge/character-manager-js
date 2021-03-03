(() => {
    //   **** Get api and show elements ****

    const tabId = new Array();

    // **** Fetch our API ****

    async function fetchCharacter() { 
        try{
            const api = await fetch('https://character-database.becode.xyz/characters');
            const data = await api.json();
            console.log(data);
            return data;

        }catch(error) {
            console.error(error);
        }
    }
    
    let apiChar = fetchCharacter();

    // **** Display Character ****

    function viewCharacter(data) {
        data.forEach(({name, shortDescription, image, description, id}) => {
            const temp = document.querySelector("#template");
            const target = document.querySelector("#target");
            const copy = temp.cloneNode(true).content;
    
            copy.querySelector(".name").innerText = name;
            copy.querySelector(".signaletics").innerText = shortDescription;
            copy.querySelector(".image").src = `data:image/*;base64,${image}`;
            copy.querySelector(".description").innerText = description;
    
            target.appendChild(copy);

            tabId.push(id);
        });

        console.log(tabId);
    }

    apiChar.then(data => {
        viewCharacter(data);
        console.log(data);
    })

    // **** View Heroes ****

    function blind() {
        const buttonView = document.getElementsByClassName("card");

        const nameCard = document.getElementsByClassName("name");
        const signaleticsCard = document.getElementsByClassName("signaletics");
        const longDescriptionCard = document.getElementsByClassName("description");
        const imgCard = document.getElementsByClassName("image");

        for (let i = 0; i < buttonView.length; i++) {
            buttonView[i].addEventListener('click', function () {

                let modalName = document.getElementById("exampleModalLabel");
                let modalShortDescription = document.getElementById("signaletics-modal");
                let modalLongDescription = document.getElementById("des-modal");
                let modalImage = document.getElementById("img-modal");

                modalName.innerText = nameCard[i].innerText;
                modalShortDescription.innerText = signaleticsCard[i].innerText;
                modalLongDescription.innerText = longDescriptionCard[i].innerText;
                modalImage.src = imgCard[i].src;
            });
        }

        // for(let i = 0; i > buttonView.length; i++) {
        //     buttonView[i].addEventListener("click", () => {
                
        //         let nameModal = document.querySelector(".modal-title");
        //         let signaleticsModal = document.querySelector(".signaleticsModal");
        //         let descriptionModal = document.querySelector(".cardModal");
        //         let imgModal = document.querySelector(".imgModal");

        //         nameModal.innerText = nameCard[i].innerText;
        //         signaleticsModal.innerText = signaleticsCard[i].innerText;
        //         descriptionModal.innerText = longDescriptionCard[i].innerText;
        //         imgModal.src = imgCard[i].src;

        //         console.log(nameModal, signaleticsModal, descriptionModal);
        //     })
        // }
    }

    apiChar.then(() => {
        blind();
    })

    // **** Erased a character ****    

    function erased() {
        Array.from(document.querySelectorAll(".btnDelete")).forEach((button, i) => {
            button.addEventListener("click", async () => {
                const erasesConfirm = confirm("Do you want to delete this character?");

                if(erasesConfirm) {
                    const id = tabId[i];
                    console.log(id);

                    try {
                        const answer = await fetch (`https://character-database.becode.xyz/characters/${id}`, {
                            method : 'DELETE',
                            headers : {
                                "Content-Type": "application/json",
                            },
                        });

                        const deleteChar = await answer.json();
                        console.log(deleteChar);
                        location.reload();

                        if(!answer.ok) {
                            console.error(answer.status);
                        }

                    } catch(error) {
                        console.error(error);
                    }
                }else {
                    alert("This character has not been deleted!");
                }
            })
        })
    }

    apiChar.then(() => {
        erased();
    })
})();