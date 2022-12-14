import React, {useContext, useEffect} from 'react';
import {attachToForm, formField} from "../../craft/wizard/components/form/Form";
import InputControl from "ui/components/controls/InputControl";
import {ReactApplicationContext} from "../../dom/ReactApplicationContext";

export function PartRefControl(props) {

  const {onChange, value, onFocus, openIfEmpty} = props;
  useEffect(() => {

    if (openIfEmpty && !value) {
      openChooser(undefined);
    }

  }, []);

  const ctx = useContext(ReactApplicationContext);

  const openChooser = e => {

    ctx.remotePartsService.choosePartRequest$.next({
      centerScreen: true,
      onDone: (partId: string) => {
        onChange(partId);
      }
    })
  };

  return <div style={{
    display: 'flex',
  }}>
    <InputControl type='text'
                  value={value || ''}
                  onChange={e => onChange(e.target.value)}
                  onFocus={onFocus}
                  style={{
                    flex: 1
                  }}/>
    <button className='compact' onClick={openChooser}>...</button>
  </div>

}

export const PartRefField = attachToForm(formField(PartRefControl));
