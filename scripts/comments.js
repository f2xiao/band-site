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
//     <img class="comments__delete" src="../assets/icons/icon-delete.svg" data-id="">
//     <img class="comments__like" src="../assets/icons/icon-like.svg" data-id="">
//     <span class="comments__likestats"></span>
//  </li>

const createNewCommentEl = () => {
  const liEl = createElwClass("li", "comments__item");
  const pEl = createElwClass("p", "comments__name");
  const pEl1 = createElwClass("p", "comments__timestamp");
  const pEl2 = createElwClass("p", "comments__text");
  const deleteIcon = createElwClass("img", "comments__delete");
  const likeIcon = createElwClass("img", "comments__like");
  const likestats = createElwClass("span", "comments__likestats");

  liEl.appendChild(pEl);
  liEl.appendChild(pEl1);
  liEl.appendChild(pEl2);
  liEl.appendChild(deleteIcon);
  liEl.appendChild(likeIcon);
  liEl.appendChild(likestats);

  return { liEl, pEl, pEl1, pEl2, deleteIcon, likeIcon, likestats };
};

const renderEachComment = ({ name, timestamp, comment, id, likes }) => {
  const { liEl, pEl, pEl1, pEl2, deleteIcon, likeIcon, likestats } =
    createNewCommentEl();
  pEl.textContent = name;
  pEl1.textContent = new Date(timestamp).toLocaleDateString();
  pEl2.textContent = comment;
  // delete icon
  deleteIcon.src = "./assets/icons/icon-delete.svg";
  deleteIcon.dataset.id = id;
  deleteIcon.addEventListener("click", handleDelete);

  // like icon
  likeIcon.src = "./assets/icons/icon-like.svg";
  likeIcon.dataset.id = id;
  likeIcon.addEventListener("click", handleLike);
  likestats.textContent = likes;

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
  const comments = await bandApi.getComments();
  // sort the comments with the newest date at the top
  // console.log(comments);

  if (comments.length === 0) {
    listEl.textContent = "No comments yet";
    return;
  } else {
    comments.sort(
      (commenta, commentb) => commentb.timestamp - commenta.timestamp
    );

    // console.log("rendering: ", comments);
    console.log(comments.length);

    renderComments(comments);
  }
}

getAndRenderComments();

// test 1: vivi vivi is here again
// test 2: viva viva la vida
// test 3: invisible invisible season 2 part 2 is out
// test 4: bochi guitar hero is me!!!!!

const handleSubmit = async (event) => {
  event.preventDefault();

  const newComment = {
    name: formEl.commentName.value,
    comment: formEl.commentText.value,
  };
  // console.log(newComment);
  const comment = await bandApi.postComment(newComment);
  console.log(comment);

  getAndRenderComments();
  event.target.reset();
};

const handleDelete = async (event) => {
  event.stopPropagation();
  // console.log(event.target.dataset.id);
  const response = await bandApi.deleteComment(event.target.dataset.id);
  getAndRenderComments();
};

const handleLike = async (event) => {
  event.stopPropagation();
  // console.log(event.target.dataset.id);
  const id = event.target.dataset.id;
  const response = await bandApi.likeComment(id);

  getAndRenderComments();
};

formEl.addEventListener("submit", handleSubmit);
