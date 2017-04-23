import "../css/base.css";
import "../css/headline.css";
import "../css/microsoft.css";

let h1 = document.createElement('h1');
let h1Text = document.createTextNode('Hello Microsoft');
h1.appendChild(h1Text);
document.body.insertBefore(h1, document.getElementById('root'));
