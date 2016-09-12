import 'normalize.css';
import 'css/font/iconfont.css';
import 'css/app.scss';
import 'github-markdown-css';

import 'whatwg-fetch';
import marked from 'marked';
import cx from 'classnames';

const modules = {
	'website': {
		url: 'website.md',
		text: '网站外包',
		icon: 'website'
	},
	'app': {
		url: 'app.md',
		text: '前端应用',
		icon: 'app'
	}
}

class App {
	constructor(modules){
		this.modules = modules;
		this.defaultModule = Object.keys(modules)[0]
		this.init();
	}
	init(){
		this.genrateTab()
		this.setContent(this.defaultModule)
	}
	genrateTab(){
		let tabNav = '<ul>';
		let tabContent = '';
		Object.keys(this.modules).forEach(key => {
			const item = this.modules[key];
			tabNav += `<li class="${cx({active: key === this.defaultModule})}">
				<a href="#${key}">
					<i class="iconfont icon-${item['icon']}"></i>
					<span>${item['text']}</span>
				</a>
			</li>`
			tabContent += `<div class=${cx("tab-" + key, {active: key === this.defaultModule})}></div>`
		})
		tabNav += '</ul>';

		document.getElementById('tab-nav').innerHTML = tabNav
		document.getElementById('tab-content').innerHTML = tabContent

	}
	setContent(module){
		const mod = this.modules[module] || {};
		fetch(mod['url'])
			.then(res => res.text())
			.then(text => {
				const html = marked(text);
				document.getElementsByClassName('tab-' + module)[0].innerHTML = html;
			})
	}
}

const app = new App(modules);