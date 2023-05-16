/*Sunet */
var sunet = document.getElementById("myAudio");

function playAudio() {
	sunet.play();
}

function pauseAudio() {
	sunet.pause();
}

/*Rezultate Formular */
function incarcare() {
	var nume = document.getElementsByName("Nume")[0].value;
	var prenume = document.getElementsByName("Prenume")[0].value;
	var zi_nastere = document.getElementsByName("Zi_de_Nastere")[0].value;
	var email = document.getElementsByName("Email")[0].value;
	var telefon = document.getElementsByName("Numar_de_Telefon")[0].value;
	var mesaj = document.getElementsByName("Mesaj")[0].value;

	document.write("<h1>Iti multumim pentru completarea formularului!</h1>");
	document.write("<h3>Raspunsurile tale sunt:</h3>");

	document.write("Nume: " + "" + nume + "<br/>");
	document.write("Prenume:   " + prenume + "<br/>");
	document.write("Zi de Nastere:   " + zi_nastere + "<br/>");
	document.write("Adresa de Email:   " + email + "<br/>");
	document.write("Numar de Telefon:   " + telefon + "<br/>");
	document.write("Mesaj:   " + mesaj + "<br/>");

	//Pentru a nu isi da refresh
	return false;
}

/*Buton UP */
(function () {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener("scroll", listener);
	};

	/**
	 * Back to top button
	 */
	let backtotop = select(".back-to-top");
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add("active");
			} else {
				backtotop.classList.remove("active");
			}
		};
		window.addEventListener("load", toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}
})();