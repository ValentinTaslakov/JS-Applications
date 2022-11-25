const urlComments = 'http://localhost:3030/jsonstore/collections/myboard/comments';
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', getCommentData);
let id = document.querySelector('.header').id;

export async function showCommentsView() {
    const comments = await getcomments();
    if (comments !== undefined) {
        document.getElementById('comment-view').style.display = 'block';
        displayComments(comments);
    }
   
}

async function getcomments() {
try {
    const response = await fetch(urlComments + "?where=" + encodeURIComponent(`${id}`));
    const comments = await response.json();
    return Object.values(comments);
} catch (error) {
    
}
}

function displayComments(comments) {
    const doms = comments.map(createCommentDom);

    const fragment = document.createDocumentFragment();

    for (const item of doms) {
        fragment.appendChild(item);
    }

    document.querySelector('#user-comment').replaceChildren(fragment);
}

function createCommentDom(comment) {
    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';

    element.innerHTML = `
    <div class="topic-name">
         <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
            <div class="post-content">
                <p>${comment.postText}</p>
            </div>
    </div>`;

    return element;
}

async function postComment(comment) {
    await fetch(urlComments, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });


}

async function getCommentData(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const d = new Date();
    const date = d.toLocaleString();


    const { username, postText } = Object.fromEntries(formData);
    if (username !== undefined && postText !== undefined) {
        let topicId = document.querySelector('.header').id;

        commentForm.reset();

        try {
            await postComment({ username, postText, topicId, date });
            showCommentsView();
        } catch (error) {
            alert(error.message);
        }
    }
}