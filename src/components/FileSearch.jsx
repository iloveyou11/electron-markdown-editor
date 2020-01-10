import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  let node = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
  }

  // 响应键盘事件
  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
    if (escPressed && inputActive) {
      closeSearch()
    }
    // const handleInputEvent = e => {
    //   const { keyCode } = e
    //   if (keyCode === 13 && inputActive) {//enter
    //     onFileSearch(value)
    //   } else if (keyCode === 27) {//esc
    //     closeSearch(e)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
  })

  // 自动聚焦
  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])


  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive &&
        <>
          <span>{title}</span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => { setInputActive(true) }}
          >
            <FontAwesomeIcon icon={faSearch} title="搜索" size="lg" />
          </button>
        </>
      }
      {inputActive &&
        <>
          <input
            type="text"
            value={value}
            onChange={e => { setValue(e.target.value) }}
            ref={node}
          />
          <button type="button" className="icon-btn" onClick={closeSearch}>
            <FontAwesomeIcon icon={faTimes} title="关闭" size="lg" />
          </button>
        </>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
}
FileSearch.defaultProps = {
  title: '我的文档'
}

export default FileSearch