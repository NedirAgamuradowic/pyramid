// variables
const age_verified = "age_verified";
const cookie_verified = "cookie_verified"
const terms_page = "pages/terms.html";
const href_attribute = "href";
const home_page = "index.html";
const menubar = ".menubar";
const modal_element = ".modal";
const cookie_element = ".cookie";
const buttons_element = ".buttons";
const show_class = "show";
const link_tag = "a";
const true_answer = "true";
const false_answer = "false";
let answer;

// events
document.addEventListener("click", handle_document_click);
document.addEventListener("DOMContentLoaded", setup_page_onload);

// handle document click event function
function handle_document_click(e) {
	const element = e.target;
	if(element.closest(menubar)){ 
		show_navbar(element);
	}else if (element.closest(modal_element)) {
		answer = get_data_value(element);
		sessionStorage.setItem(age_verified, answer);
		age_verification_action(element, answer);
	}else if(element.closest(cookie_element)) {
		answer = get_data_value(element);
		sessionStorage.setItem(cookie_verified, answer);
		if (answer == true_answer || answer == false_answer) {
			remove_class(cookie_element, show_class);
		}else if( answer == "setting"){
			sessionStorage.setItem(cookie_verified, false_answer);
			add_class(cookie_element, answer);
		}else{
			if (element.closest(buttons_element)) {
				work_with_busy_class(element);
			}
		}
	}
}

// setup page load function
function setup_page_onload() {
	const is_age_verified = get_value_from_storage(age_verified);
	if(is_age_verified){
		if(is_age_verified == false_answer){
			remove_links();
		}else {
			const is_cookie_verified = get_value_from_storage(cookie_verified);
			if(is_cookie_verified == false_answer || is_cookie_verified == null) add_class(cookie_element, show_class);
		}
	}else{
		add_class(modal_element, show_class);
	}
}

// when user click age verification
function age_verification_action(element, answer) {
	if(answer == true_answer){
		stay_at_home(element);
	}else{
		redirect_page(element);
	}
}

// function that work busy class
function work_with_busy_class(element) {
	const parent = element.closest(buttons_element);
	parent.querySelector(".busy").classList.remove("busy");
	element.classList.add("busy");
}

// get data attribute value for age verified
function get_data_value(element){
	const answer = element.dataset.answer;
	return answer;
}

// get value from session storage
function get_value_from_storage(key){
	return sessionStorage.getItem(key);
}

// redirect page if age verified false
function redirect_page(element) {
	element.setAttribute(href_attribute, terms_page);
}

// if age verified is true stay at page
function stay_at_home(element) {
	element.setAttribute(href_attribute, home_page);
}

// adding show class 
function add_class(element, clases){
	document.querySelector(element).classList.add(clases);	
}

// remove show class
function remove_class(element, clases){
	document.querySelector(element).classList.remove(clases);	
}

// remove links when age verified is false
function remove_links() {
	const links = document.querySelectorAll(link_tag);
	links.forEach(link => {
		link.setAttribute(href_attribute, "#");
	});
}

// show navbar script when mobile
function show_navbar(element) {
	const navbar = element.closest(menubar).parentElement;
	const check_navbar = navbar.classList.contains(show_class);
		if(check_navbar){
			navbar.classList.remove(show_class);
		}else{
			navbar.classList.add(show_class);
		}
}