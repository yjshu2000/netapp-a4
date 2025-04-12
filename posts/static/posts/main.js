console.log("Hello from main.js");

//const helloWorldBox = document.getElementById("hello-world");
//he put helloWolrdBox :( sad
//helloWorldBox.innerHTML = "Hello World!";
const postsBox = document.getElementById("posts-box");
const spinnerBox = document.getElementById("spinner-box");
const loadBtn = document.getElementById("load-btn");
const endBox = document.getElementById("end-box");

const postForm = document.getElementById("post-form");
const title = document.getElementById("id_title");
const body = document.getElementById("id_body");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

const url = window.location.href;

const alertBox = document.getElementById("alert-box");

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = () => {
    const likeUnlikeForms = document.querySelectorAll('.like-unlike-forms');
    likeUnlikeForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const clickedId = e.target.getAttribute('data-form-id');
            const clickedBtn = document.getElementById(`like-unlike-${clickedId}`);

            $.ajax({
                type: 'POST',
                url: "/like-unlike/",
                data: {
                    'csrfmiddlewaretoken': csrftoken,
                    'pk': clickedId,
                },
                success: function(response) {
                    console.log("Success:", response);
                    clickedBtn.innerHTML = response.liked ? `Unlike (${response.count})` : `Like (${response.count})`;
                    //clickedBtn.classList.toggle('btn-primary');
                },
                error: function(error) {
                    console.error("Error:", error);
                }
            })
        });
    });
}

/* $.ajax({
    type: 'GET',
    url: '/hello-world',
    success: function(response) {
        console.log("Success:", response.text);
        helloWorldBox.innerHTML = response.text;
    },
    error: function(xhr, status, error) {
        console.error("Error:", error);
    }
}) */

let visible = 3;

const getData = () => {
    $.ajax({
        type: 'GET',
        url: `/data/${visible}/`,
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
                                    <a href="${url}${el.id}" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-2">
                                    <form class="like-unlike-forms" data-form-id="${el.id}">
                                        <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">
                                            ${el.liked ? `Unlike (${el.count})`: `Like (${el.count})`}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                });
                likeUnlikePosts();
            }, 200)
            console.log(response.size);
            if (response.size === 0 ) {
                endBox.textContent = "No posts added yet.";
            }
            else if (response.size <= visible) {
                loadBtn.classList.add('not-visible');
                endBox.textContent = "No more posts to load.";
            }
        },
        error: function(error) {
            console.error("Error:", error);
        }
    })
}

loadBtn.addEventListener('click', () => {
    visible += 3;
    spinnerBox.classList.remove('not-visible');
    getData();
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': title.value,
            'body': body.value,
        },
        success: function(response) {
            console.log(response)
            postsBox.insertAdjacentHTML('afterbegin', `
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <p class="card-text">${response.body}</p>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-2">
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-2">
                                <form class="like-unlike-forms" data-form-id="${response.id}">
                                    <button href="#" class="btn btn-primary" id="like-unlike-${response.id}">
                                        Like (0)
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                `)
                likeUnlikePosts();
                $('#addPostModal').modal('hide');
                handleAlerts('success', 'Post added successfully!');
                postForm.reset();
        },
        error: function(error) {
            console.error("Error:", error);
            handleAlerts('danger', 'Error adding post!'); //he put ups instead of oops lol. polish hmm
        }
    })
})

getData();