(function() {
	"use strict";
	let pcList = document.querySelectorAll('.pc');
	let vdList = document.querySelectorAll('.vdcard');
	let laptopList = document.querySelectorAll('.laptop');
	let compList = document.querySelectorAll('.computer');
	let mapWidget = document.querySelector('.map_widget');
	let scrollBar = document.querySelector('.scrollBar');
	let navLink = document.querySelectorAll('.nav__link');
	let logoLink = document.querySelector('.logo')
	/*[pan and mainArticle CSS scrolls]*/
	var pnls = document.querySelectorAll('.fullPage').length,
		scdir, hold = false;
	var vw = window.innerWidth/6;
	scrollBar.style.width = vw+'px';

	function _scrollY(obj) {
		var slength,plength, pan, step = 100,
			vh = window.innerHeight / 100,
			vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
		if ((this !== undefined && this.id === 'mainArticle') || (obj !== undefined && obj.id === 'mainArticle')) {
			pan = this || obj;
			plength = parseInt(pan.offsetHeight / vh);
		}
		if (pan === undefined) {
			return;
		}
		plength = plength || parseInt(pan.offsetHeight / vmin);
		slength = parseInt(pan.style.transform.replace('translateY(', ''));
		if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) {
			slength = slength + step;
		} else if (scdir === 'top') {
			slength = 0;
			scrollBar.style.borderRadius = "0 15px 15px 0";
		} else if (scdir === 'costs') {
			slength = -100;
		} else if (scdir === 'reviews') {
			slength = -400;
		} else if (scdir === 'contacts') {
			slength = -500;
		}
		if (hold === false) {
			hold = true;
			
			pan.style.transform = 'translateY(' + slength + 'vh)';

			switch (slength) {
				case 0: 
					pcList.forEach((el)=>{
						el.classList.remove('unvisible');
					});
					vdList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					break;
				case -100:
					pcList.forEach((el)=>{
						el.classList.add('unvisible');
					});
					vdList.forEach((el)=>{
						el.classList.remove('unvisible')
					});
					laptopList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					break;
				case -200:
					vdList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					laptopList.forEach((el)=>{
						el.classList.remove('unvisible')
					});
					compList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					break;
				case -300:
					laptopList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					compList.forEach((el)=>{
						el.classList.remove('unvisible')
					});
					break;
				case -400:
					compList.forEach((el)=>{
						el.classList.add('unvisible')
					});
					mapWidget.classList.add('unvisible');
					break;
				case -500:
					mapWidget.classList.remove('unvisible');
					break;
			}
			if(Math.abs(slength) > 0){
				var index = Math.abs(slength)/100+1;
				scrollBar.style.width = vw * index +'px';
				if(slength == -500){
					scrollBar.style.borderRadius = 0;
				} else {
					scrollBar.style.borderRadius = "0 15px 15px 0";
				}
			} else {
				scrollBar.style.width = vw + 'px ';
			}
			
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
		console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
	}
	/*[swipe detection on touchscreen devices]*/
	function _swipe(obj) {
		var swdir,
			sX,
			sY,
			dX,
			dY,
			threshold = 100,
			/*[min distance traveled to be considered swipe]*/
			slack = 50,
			/*[max distance allowed at the same time in perpendicular direction]*/
			alT = 500,
			/*[max time allowed to travel that distance]*/
			elT, /*[elapsed time]*/
			stT; /*[start time]*/
		obj.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
			//e.preventDefault();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault(); /*[prevent scrolling when inside DIV]*/
		}, false);

		obj.addEventListener('touchend', function(e) {
			var tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;
			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}
				if (obj.id === 'mainArticle') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);

					}
					e.stopPropagation();
				}
			}
		}, false);
	}
	/*[assignments]*/
	var mainArticle = document.getElementById('mainArticle');
	mainArticle.style.transform = 'translateY(0)';
	mainArticle.addEventListener('wheel', function(e) {
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});
	mainArticle.addEventListener('wheel', _scrollY);
	_swipe(mainArticle);
	logoLink.addEventListener('click', ()=>{
		scdir = 'top';
		_scrollY(mainArticle);
	})
	navLink.forEach((el)=>{
		el.addEventListener('click', () => {
			if(el.id === 'costs') {
				scdir = 'costs';
			} else if(el.id === 'reviews') {
				scdir = 'reviews';
			} else if(el.id === 'contacts') {
				scdir = 'contacts';
			}
			_scrollY(mainArticle);
		}); 
	});
})();