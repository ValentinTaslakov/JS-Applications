import { showCommentsView } from "./comment.js";

const urlTopic = 'http://localhost:3030/jsonstore/collections/myboard/posts';


function showPostCommentView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');

    document.getElementById('post-comment-view').style.display = 'block';
}

export async function showComments(event) {
    event.preventDefault();
    if (event.target.tagName == 'H2') {
        const id = event.target.parentElement.parentElement.parentElement.id;

        showCommentsView(id);
        const topic = await getTopic(id);
        displayTopicDetayls(topic, id);

        showPostCommentView();
    }
}

async function getTopic(id) {
    try {
        
        const response = await fetch(urlTopic + '/' + id);
        const topic = await response.json();
    
        return topic;
    } catch (error) {
        
    }
}



function displayTopicDetayls(topic, id) {
    const div = document.querySelector('.header');
    div.id = id;

    div.innerHTML = `<img src="./static/profile.png" alt="avatar">
                <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>

                <p class="post-content">${topic.postText}</p>`;
    
    document.querySelector('.theme-name').children[0].textContent = `${topic.title}`;

}

