document.addEventListener("DOMContentLoaded", () => {
	let currentPage, keywords, params, request, jokPerPage, totalJokes, totalPages;
	let search_input = document.querySelector("#search_input");

	let submit_btn = document.querySelector("#search_submit");
	let next_btn = document.querySelector("#jokes_next_page");
	let prev_btn = document.querySelector("#jokes_prev_page");
	next_btn.disabled = true;
	prev_btn.disabled = true;

	search_input.addEventListener('keydown', (e) => {
		if (e.key == "Enter") submit_btn.click();
	})

	let search_index = document.querySelector("#jokes_page_index");
	let keywords_container = document.querySelector("#keywords_container");
	let display = document.querySelector("#jokes_result_container")

	let url = "https://icanhazdadjoke.com/search"
	let options = {
		method: 'GET',
		headers: { Accept: 'application/json' }
	}



	function searchJokes(words) {
		display.innerHTML = "";

		fetch(request, options).then(response => {
			if (response.ok) {
				response.json().then(data => {
					totalJokes = data.total_jokes;
					totalPages = data.total_pages;
					search_index.innerText = currentPage + "/" + totalPages;

					if (currentPage == 1) document.querySelector("#jokes_prev_page").disabled = true;
					else document.querySelector("#jokes_prev_page").disabled = false;

					if (currentPage == totalPages) document.querySelector("#jokes_next_page").disabled = true;
					else document.querySelector("#jokes_next_page").disabled = false;

					if (jokPerPage <= totalJokes) {
						for (let i = 0; i < jokPerPage; i++) {
							let joke_container = document.createElement("div");
							joke_container.classList.add("joke_container");
							let joke = document.createElement("p");
							joke.classList.add("joke");
							joke.innerText = data.results[i].joke
							joke_container.appendChild(joke);
							display.appendChild(joke_container)
						}
					}

					else {
						for (let i = 0; i < totalJokes; i++) {
							let joke_container = document.createElement("div");
							joke_container.classList.add("joke_container");
							let joke = document.createElement("p");
							joke.classList.add("joke");
							joke.innerText = data.results[i].joke
							joke_container.appendChild(joke);
							display.appendChild(joke_container)
						}
					}

				})
			} else {
				alert("erreur avec la requête");
			}
		}).catch(error => {
			alert("erreur avec l'appel ( ex url erronnée)");
		})

		keywords_container.innerHTML = "";
		let temp = document.createElement("p");
		temp = "Mots Clés : " + keywords_notEncoded;
		keywords_container.append(temp);

	}

	submit_btn.addEventListener('click', () => {
		keywords_notEncoded = search_input.value;
		currentPage = 1;
		jokPerPage = 5;
		keywords = encodeURIComponent(keywords_notEncoded)
		params = "?term=" + keywords + "&limit=" + jokPerPage + "&page=" + currentPage;
		request = url + params
		searchJokes(keywords);
	})

	next_btn.addEventListener('click', () => {
		display.innerHTML = "";
		currentPage++;
		params = "?term=" + keywords + "&limit=" + jokPerPage + "&page=" + currentPage;
		request = url + params;
		searchJokes(keywords);
	})

	prev_btn.addEventListener('click', () => {
		currentPage--;
		params = "?term=" + keywords + "&limit=" + jokPerPage + "&page=" + currentPage;
		request = url + params;
		searchJokes(keywords);
	})



})
