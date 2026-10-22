// I find the frame and keep track of the current team.
const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10;

// I use async so this function can use await while the API data loads.
async function getData() {
    // My added code starts here. I find the paragraph used to show an error.
    const message = document.getElementById('message');

    // I try to load the teams. If something fails, catch handles the error below.
    try {
        // I use fetch to request La Liga teams and await to wait for the response.
        // The 123 in the URL is TheSportsDB's public free API key.
        const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Spanish_La_Liga');

        // ! means "not." If the request was not successful, I send an error to catch.
        if (!response.ok) {
            throw new Error('The API request failed.');
        }

        // I read the JSON response and turn it into JavaScript data I can use.
        const data = await response.json();

        // I get the array of teams stored in the response's "teams" property.
        const teamData = data.teams;

        // I check that the team list exists and contains at least 10 teams.
        // || means "or," so either problem sends an error to catch.
        if (!teamData || teamData.length < totalItems) {
            throw new Error('The API did not return enough teams.');
        }

        // I repeat this block 10 times, using positions 0 through 9.
        // i starts at 0, i < totalItems keeps the loop going, and i++ adds 1 each time.
        for (let i = 0; i < totalItems; i++) {
            // I get the team at the current position in the array.
            const team = teamData[i];

            // I create an empty li element to hold this team's information.
            const item = document.createElement('li');

            // I create an image and use the team's badge URL as its source.
            const badge = document.createElement('img');
            badge.src = team.strBadge;

            // I add text that describes the badge for screen readers or a missing image.
            badge.alt = team.strTeam + ' badge';

            // I create a heading and put the team's name inside it as text.
            const name = document.createElement('h2');
            name.innerText = team.strTeam;

            // I create a paragraph and put the team's country inside it.
            const country = document.createElement('p');
            country.innerText = team.strCountry;

            // I create a paragraph for the stadium. || uses "Not listed" if it is missing.
            const stadium = document.createElement('p');
            stadium.innerText = 'Stadium: ' + (team.strStadium || 'Not listed');

            // I place the badge, name, country, and stadium inside this team's li.
            item.append(badge, name, country, stadium);

            // I add the completed li to the frame. After the loop, the frame has 10 items.
            frame.appendChild(item);
        }

        // I give the first li the active class. CSS shows it and hides the other teams.
        frame.querySelector('li').classList.add('active');
    } catch (error) {
        // I log the error for debugging and show a simple message on the page.
        console.log(error);
        message.innerText = 'Teams could not load. Refresh the page to try again.';
    }
}

// this function switches teams. index is the position to show.
function goToItem(index) {
    // I collect all the li elements inside the frame in their original order.
    const items = frame.querySelectorAll('li');

    // I remove active from the current team, which makes CSS hide it.
    items[currentItem].classList.remove('active');

    // I update the current position and give active to the team I want to show.
    currentItem = index;
    items[currentItem].classList.add('active');
}

// clicking the frame moves to the next team.
frame.addEventListener('click', function () {
    // My extra check stops early clicks before the first team is ready.
    if (!frame.querySelector('li.active')) {
        return;
    }

    // I add 1 to move to the next team. % gives the remainder after division.
    // After position 9, (9 + 1) % 10 becomes 0, so the slideshow starts over.
    const nextItem = (currentItem + 1) % totalItems;

    // I pass that next position to goToItem so it can display the next team.
    goToItem(nextItem);
});

// I call getData once to start loading the teams.
getData();
