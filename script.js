(() => {
    //   **** Get api and show elements ****

    const tabId = new Array();
    const allVal = Array.from(document.querySelectorAll("input"));

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

    // **** View Heroes ****

    function blind() {
        const buttonView = document.getElementsByClassName("card");

        const nameCard = document.getElementsByClassName("name");
        const signaleticsCard = document.getElementsByClassName("signaletics");
        const longDescriptionCard = document.getElementsByClassName("description");
        const imgCard = document.getElementsByClassName("image");

        for(let i = 0; i < buttonView.length; i++) {
            buttonView[i].addEventListener("click", () => {
                
                let nameModal = document.querySelector(".modal-title");
                let signaleticsModal = document.querySelector(".signaleticsModal");
                let descriptionModal = document.querySelector(".cardModal");
                let imgModal = document.querySelector(".imgModal");

                nameModal.innerText = nameCard[i].innerText;
                signaleticsModal.innerText = signaleticsCard[i].innerText;
                descriptionModal.innerText = longDescriptionCard[i].innerText;
                imgModal.src = imgCard[i].src;

                console.log(nameModal, signaleticsModal, descriptionModal);
            })
        }
    }

    // **** Create a character ****

    function create() {
        let image = "";
        document.querySelector("#inputImg").addEventListener("change", (event) => {
            const fileList = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                image = reader.result.replace('data:', '').replace(/^.+,/, '');
            };
            reader.readAsDataURL(fileList);
        });

        document.querySelector("#addBtn").addEventListener("click", async () => {
            const values = allVal.map(({value}) => value.trim());
            const [name, shortDescription, description] = values;
            const post = await fetch("https://character-database.becode.xyz/characters", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    name,
                    shortDescription,
                    description,
                    image,
                })
            })
            document.location.reload();

            if(!post.ok) {
                console.error(post.status);
            }
        })
    }

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

    let apiChar = fetchCharacter();

    apiChar.then(data => {
        viewCharacter(data);
        blind();
        create();
        erased();
    })
})();