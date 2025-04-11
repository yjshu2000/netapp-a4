console.log("Hello from main.js");

const helloWorldBox = document.getElementById("hello-world");
//he put helloWolrdBox :( sad
//helloWorldBox.innerHTML = "Hello World!";
const postsBox = document.getElementById("posts-box");
const spinnerBox = document.getElementById("spinner-box");

$.ajax({
    type: 'GET',
    url: '/hello-world',
    success: function(response) {
        console.log("Success:", response.text);
        helloWorldBox.innerHTML = response.text;
    },
    error: function(xhr, status, error) {
        console.error("Error:", error);
    }
})

$.ajax({
    type: 'GET',
    url: '/data/',
    success: function(response) {
        console.log("Success:", response.data);
        const data = response.data;
        setTimeout(() => {
            spinnerBox.classList.add('not-visible');
            console.log(data);
            data.forEach(el => {
                postsBox.innerHTML += `
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.body}</p>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-2">
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-2">
                                <a href="#" class="btn btn-primary">Like</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }, 1000);
        }
)
    },
    error: function(error) {
        console.error("Error:", error);
    }
})