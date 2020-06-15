/*********************************************************************

 NOTE: that in order to receive click events you need to configure an
 interaction shortcut and give Übersicht accessibility access.
 
**********************************************************************/

const configFile = "~/.config/skhd/yabai_skhdrc";

/* TODO
 * - parse key list and style
 * - overall styling
 * - refresh when config changes
 * - store collapsed states
 */

import { css } from "uebersicht";

export const command = "remontoire.widget/parse.py " + configFile;
export const refreshFrequency = false;

export const className = css`
  top: 10px;
  left: 10px;
  position: absolute;
  -webkit-backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.95);
  color: grey;
  border-radius: 1px;
  border: 2px solid #fff;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;

  ul
    margin: 0px;

`;

const container = css`
  font-family: Helvetica Neue;
  font-weight: 300;
  line-height: 1.5;
  text-align: justify;
`;


const action = css`
  text-align: left;
`;

const keys = css`
  text-align: right;
  background-color: #CCC3;
`;

function CollapsibleCategoryList(props) {
  const category = props.category.category;
  const actions = props.category.actions;
  return (
    <div className="wrap-collapsible">
      <input id={category} className="toggle" type="checkbox" />
      <label htmlFor={category} className="lbl-toggle">{category}</label>
      <div className="collapsible-content">
        <div className="content-inner">
          <ul>
            {actions.map((action) =>
              <ActionItem key={action.keys} value={action} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}
  
function ActionItem(props) {
  return (
    <li>
      <span className={action}>{props.value.action}</span>
      &nbsp;|&nbsp;
      <span className={keys}>{props.value.keys}</span>
    </li>
  );
}

const emptyNav = '[ { "category": "Loading...", "actions": [] } ]';
/*
const storedNav = localStorage.getItem("storedNav");
export const initialState = storedNav ? storedNav : emptyNav;
*/

export const render = ({output, error}) => {
  const data = output ? output : emptyNav;
  const cats = JSON.parse(data);
  //localStorage.setItem("storedNav", data);
  const listItems = cats.map((cat) => 
         <CollapsibleCategoryList key={cat.category} category={cat} />
        );

  return error ? (
    <div className={container}>
      Something went horribly wrong: <strong>{String(error)}</strong></div>
  ) : (
    <div className={container}>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

