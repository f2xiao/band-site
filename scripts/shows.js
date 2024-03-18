import BandSiteApi from "./BandSiteApi.js";
/* <tr>
    <th class="shows__header">Date</th>
    <th class="shows__header">Venue</th>
    <th class="shows__header">Location</th>
</tr>
<tr class="shows__row">
    <td class="shows__date">Mon Sept 09 2024</td>
    <td class="shows__venue">Ronald Lane</td>
    <td class="shows__location">San Francisco, CA</td>
    <td class="shows__button"><a>Buy tickets</a></td>
</tr> */

const createElwClass = (tag, className) => {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
};

const createMultiEl = (tag, classNameArr) =>
  classNameArr.map((className) => createElwClass(tag, className));

const createTableHeaderEl = (headerTitles) => {
  const trEl = createElwClass("tr", "shows__row");
  const thElArray = createMultiEl("th", [
    "shows__header",
    "shows__header",
    "shows__header",
  ]);

  thElArray.forEach((thEl, index) => {
    thEl.textContent = headerTitles[index];
    trEl.appendChild(thEl);
  });
  return trEl;
};

const createTableRowEl = () => {
  const trEl = createElwClass("tr", "shows__row");
  const tdElArray = createMultiEl("td", [
    "shows__date",
    "shows__venue",
    "shows__location",
    "shows__button",
  ]);
  const linkEl = document.createElement("a");

  return {
    trEl: trEl,
    tdEl1: tdElArray[0],
    tdEl2: tdElArray[1],
    tdEl3: tdElArray[2],
    tdEl4: tdElArray[3],
    linkEl: linkEl,
  };
};
// convert date in ms to date
const dateString = (ms) => {
  const date = new Date(ms);
  return date.toDateString();
};

const renderEachRow = ({ date, place, location }) => {
  const { trEl, tdEl1, tdEl2, tdEl3, tdEl4, linkEl } = createTableRowEl();
  tdEl1.textContent = dateString(date);
  tdEl2.textContent = place;
  tdEl3.textContent = location;
  linkEl.textContent = "Buy Tickets";
  linkEl.href = "#";
  trEl.appendChild(tdEl1);
  trEl.appendChild(tdEl2);
  trEl.appendChild(tdEl3);
  tdEl4.appendChild(linkEl);
  trEl.appendChild(tdEl4);
  tableEl.appendChild(trEl);
};

const renderShows = (shows, tableEl) => {
  tableEl.textContent = "";
  // console.log(shows);

  if (shows.length > 0) {
    tableEl.appendChild(createTableHeaderEl(["DATE", "VENUE", "LOCATION"]));
    shows.forEach(renderEachRow);
  } else {
    tableEl.textContent = "No shows yet";
  }
};

const tableEl = document.querySelector(".shows__table");
const apiKey = "9cd15e0f-1dba-47d8-b301-f0f22314686f";
const bandApi = new BandSiteApi(apiKey);
async function getAndRenderShows() {
  try {
    const shows = await bandApi.getShows();
    renderShows(shows, tableEl);

    // selected state after click
    const rows = tableEl.getElementsByTagName("tr");
    // console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", function (event) {
        event.stopPropagation();
        for (let j = 0; j < rows.length; j++) {
          rows[j].classList.remove("shows__row--selected");
        }
        this.classList.add("shows__row--selected");
      });
    }
  } catch (error) {
    console.log(error);
    tableEl.textContent = "Failed to get shows";
  }
}

getAndRenderShows();
