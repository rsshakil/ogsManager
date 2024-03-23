import React, { useCallback } from 'react';
import TagBox from 'devextreme-react/tag-box';
import { CheckBox, CheckBoxTypes } from 'devextreme-react/check-box';

const nameLabel = { 'aria-label': 'Name' };
const DataGridCheckBox = (props) => {
  const onValueChanged = useCallback(
    (e) => {
      props.data.setValue(e.value);
    },
    [props],
  );
  const onSelectionChanged = useCallback(() => {
    props.data.component.updateDimensions();
  }, [props]);
  return (
    <CheckBox
      defaultValue={props.data.value}
      onValueChanged={onValueChanged}
      onSelectionChanged={onSelectionChanged}
    />
  );
};
export default DataGridCheckBox;
