const comments = [
  {
    name: "Victor Pinto",
    timestamp: "11/02/2023",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Christina Cabrera",
    timestamp: "10/28/2023",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Isaac Tadesse",
    timestamp: "10/20/2023",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];
// test: vivi vivi is here

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

const renderEachComment = ({ name, timestamp, text }) => {
  const { liEl, pEl, pEl1, pEl2 } = createNewCommentEl();
  pEl.textContent = name;
  pEl1.textContent = timestamp;
  pEl2.textContent = text;
  listEl.appendChild(liEl);
};

const renderComments = (comments) => {
  listEl.textContent = "";
  comments.forEach(renderEachComment);
};

const formEl = document.querySelector(".comments__form");
const listEl = document.querySelector(".comments__list");

const handleSubmit = (event) => {
  event.preventDefault();

  const newComment = {
    name: formEl.commentName.value,
    text: formEl.commentText.value,
    timestamp: new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
  };
  renderComments([newComment, ...comments]);
  formEl.commentName.value = "";
  formEl.commentText.value = "";
};

formEl.addEventListener("submit", handleSubmit);
renderComments(comments);
