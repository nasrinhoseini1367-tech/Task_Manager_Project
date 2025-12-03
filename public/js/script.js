const list = document.querySelector(".list-group");

list.addEventListener("click", async (event) => {
    const target = event.target;
    const id = parseInt(target.parentElement.dataset.id);
    if (target.classList.contains("toggle-btn")) {
        try {
            const response = await axios.post("/toggle-task", { id });
            if (response.data === true) {
                location.reload();
            } else {
                alert(response.data);
            }
        } catch (e) {
            alert(e.response.data);
        }
    } else if (target.classList.contains("edit-btn")) {
        const title = target.parentElement.querySelector("label").textContent;
        const answer = prompt("Enter a new title:", title);
        if (answer && answer.length >= 3) {
            try {
                const response = await axios.post("/edit-task", { id, title: answer });
                if (response.data === true || response.data?.success) {
                    // فقط متن label را آپدیت کن
                    const label = target.parentElement.querySelector("label");
                    if (label) label.textContent = answer;
                } else {
                    alert(response.data);
                }
            } catch (e) {
                alert(e.response.data);
            }
        } else if (answer) {
            alert("enter at least 3 charecters");
        } else {
            alert("enter a title");
        }
    } else if (target.classList.contains("delete-btn")) {
        try {
            const response = await axios.post("/delete-task", { id });
            if (response.data === true) {
                target.parentElement.remove();
                if (!document.querySelectorAll("li").length) {
                    const ul = document.querySelector("ul");
                    ul.outerHTML = "<h2 class = 'text-center'>there is no task! </h2>";
                }
            } else {
                alert(response.data);
            }
        } catch (e) {
            alert(e.response.data);
        }
    }
});
