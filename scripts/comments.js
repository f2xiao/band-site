import BandSiteApi from "./BandSiteApi.js";

const createElwClass = (tag, className) => {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
};

// <li class="comments__item">
//     <p class="comments__name"></p>
//     <p class="comments__timestamp"></p>
//     <p class="comments__text"></p>
//  </li>

const createNewCommentEl = () => {
  const liEl = createElwClass("li", "comments__item");
  const pEl = createElwClass("p", "comments__name");
  const pEl1 = createElwClass("p", "comments__timestamp");
  const pEl2 = createElwClass("p", "comments__text");

  liEl.appendChild(pEl);
  liEl.appendChild(pEl1);
  liEl.appendChild(pEl2);

  return { liEl, pEl, pEl1, pEl2 };
};

const renderEachComment = ({ name, timestamp, comment }) => {
  const { liEl, pEl, pEl1, pEl2 } = createNewCommentEl();
  pEl.textContent = name;
  pEl1.textContent = new Date(timestamp).toLocaleDateString();
  pEl2.textContent = comment;
  listEl.appendChild(liEl);
};

const renderComments = (comments) => {
  listEl.textContent = "";
  comments.forEach(renderEachComment);
};

const formEl = document.querySelector(".comments__form");
const listEl = document.querySelector(".comments__list");

const apiKey = "e0fb7894-462d-43cb-bf8d-d45a7b2998ea";
const bandApi = new BandSiteApi(apiKey);

async function getAndRenderComments() {
  try {
    const comments = await bandApi.getComments();
    // sort the comments with the newest date at the top
    // console.log(comments);

    comments.sort(
      (commenta, commentb) => commentb.timestamp - commenta.timestamp
    );

    // console.log(comments);
    renderComments(comments);
  } catch (error) {
    console.log(error);
    listEl.textContent = " Failed to get comments";
  }
}

getAndRenderComments();

// test: vivi vivi is here again

const handleSubmit = async (event) => {
  event.preventDefault();

  const newComment = {
    name: formEl.commentName.value,
    comment: formEl.commentText.value,
    // timestamp: new Date().getTime(),
  };
  console.log(newComment);

  try {
    const comment = await bandApi.postComment(newComment);
    // renderComments([newComment, ...comments]);
    getAndRenderComments();
    formEl.commentName.value = "";
    formEl.commentText.value = "";
  } catch (error) {
    console.log(error);
    alert("failed to comment");
  }
};

formEl.addEventListener("submit", handleSubmit);
