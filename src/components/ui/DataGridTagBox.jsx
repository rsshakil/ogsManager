import React, { useCallback } from 'react';
import TagBox from 'devextreme-react/tag-box';

const nameLabel = { 'aria-label': 'Name' };
const DataGridTagBox = (props) => {
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
    <TagBox
      dataSource={props.data.column.lookup.dataSource}
      defaultValue={props.data.value}
      valueExpr="videoId"
      displayExpr="videoName"
      showSelectionControls={true}
      inputAttr={nameLabel}
      showMultiTagOnly={false}
      // applyValueMode="useButtons"
      searchEnabled={true}
      onValueChanged={onValueChanged}
      onSelectionChanged={onSelectionChanged}
    />
  );
};
export default DataGridTagBox;
