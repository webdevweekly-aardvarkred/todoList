import React, { PropTypes } from 'react'

const Loader = ({ loading }) => (
  <div className='spinner' style={loading}>
    <div className='line'>
    </div>
    <div className='line two'>
    </div>
    <div className='line three'>
    </div>
    <div className='line four'>
    </div>
    <div className='line five'>
    </div>
    <div className='line six'>
    </div>
  </div>
)

Loader.propTypes = {
  loading: PropTypes.object
}

export default Loader
