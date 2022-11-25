import { showComments } from "./topicDetajls.js";

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

const topicForm = document.querySelector('form');
topicForm.addEventListener('submit', getTopicData);


export async function showHomeView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');

    const topics = await getTopicList();

    document.getElementById('home-view').style.display = 'block';
    if (topics !== undefined) {
        displayTopics(topics);
    }
}


async function postNewTopic(topic) {
    await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(topic)
    });

   
}

async function getTopicData(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const { title, username, postText } = Object.fromEntries(formData);
    if (event.submitter.textContent === 'Post' && title !== undefined && username !== undefined && postText !== undefined) {
        const d = new Date();
        const date = d.toLocaleString();
        topicForm.reset();

        try {
            await postNewTopic({ title, username, postText, date });
            showHomeView();
        } catch (error) {
            alert(error.message);
        }
    } else if (event.submitter.textContent === 'Cancel') {
        topicForm.reset();
    }
}

async function getTopicList() {
    try {
        const response = await fetch(url);
        const topicList = await response.json();

        return Object.values(topicList).reverse();
    } catch (error) {

    }
}

function displayTopics(topicList) {
    const doms = topicList.map(createTopicDom);

    const fragment = document.createDocumentFragment();

    for (const item of doms) {
        fragment.appendChild(item);
    }

    document.querySelector('.topic-container').replaceChildren(fragment);
}

function createTopicDom(topic) {
    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';
    element.id = topic._id;
    element.innerHTML = `
    <div class="topic-name">
        <a href="#" class="normal">
            <h2>${topic.title}</h2>
        </a>
    <div class="columns">
        <div>
            <p>Date: <time>${topic.date}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${topic.username}</span></p>
                </div>
            </div>
        </div>
    </div>`;
    element.addEventListener('click', showComments);
    return element;
}

