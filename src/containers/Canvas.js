import React from 'react';
import {connect} from 'react-redux';
const toHex = n => '#' + (n.toString(16) + '00000000').substr(0, 6);
const Canvas = props => {
  const {canvas, dispatch} = props;
  const cells = new Array(canvas.height);
  for(let i=0, h = canvas.height; i < h; i++) {
    const row = new Array(canvas.width);
    for(let j=0, w = canvas.width; j < w; j++) {
      const cellStyle = {
        backgroundColor: toHex(canvas.grid[i * w + j]),
        width: 16,
        height: 16,
        display: 'inline-block',
        border: '0.1px solid #fff',
        margin: 0
      };
      row[j] = <span onMouseDown={e => (e.button === 0) ? props.fillCell(j, i) : void 0  } key={j} style={cellStyle}/>;
    }
    cells[i] = (
      <div key={i}>
        {row}
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>
          {cells}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({canvas: state.grid});
const mapDispatchToProps = dispatch => {
  return {
    fillCell(x, y) {
      dispatch({type: 'FILL_CELL', payload: {x, y}})
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
