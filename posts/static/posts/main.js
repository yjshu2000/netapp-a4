console.log("Hello from main.js");

const helloWorldBox = document.getElementById("hello-world");
//he put helloWolrdBox :( sad

//helloWorldBox.innerHTML = "Hello World!";

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