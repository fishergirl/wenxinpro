import React, { Component, Fragment } from 'react';
import { face } from './face'
import styles from './qqface.less'

const _pad = (num)=>{
  if(num>9){
    return num
  }else{
    return '0' + num
  }
};
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export default class Analysis extends Component {

	render() {
	  const { faceItem, handleChoice, faceWord } = this.props;

	  const faceitem = (
      <img src={ './qqface/'+_pad(face.indexOf(faceItem)+1)+'.png' } alt=""/>
    );

    const faceword = (
      <Fragment>
        {(()=>{
            let str = faceWord;
            str && face.forEach((item)=>{
              // str = str.replace(item,`<img src="./qqface/${_pad(face.indexOf(item)+1)}.png" alt=""/>`)
              str = str.replace(new RegExp(escapeRegExp(item),'g'),`<img src="./qqface/${_pad(face.indexOf(item)+1)}.png" alt=""/>`);
            });
            return <span dangerouslySetInnerHTML={{__html:str}} />
          })()}
      </Fragment>
    );



		const faceList = (
		  <div className={styles.face_box}>
        <ul>
          { face.map((item,index)=>(
            <li key={index} onClick={()=>{handleChoice(item)}}>
              <img src={'./qqface/'+_pad(index+1)+'.png'} alt=""/>
            </li>
          )) }
        </ul>
      </div>
    );

		return (
			<Fragment>
        {faceItem ? faceitem : faceWord ? faceword : faceList}
			</Fragment>
		);
	}
}
