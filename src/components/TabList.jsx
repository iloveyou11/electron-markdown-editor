import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import './TabList.scss'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onTabClose }) => {
  return (
    <ul className="nav nav-pills tablist-component">
      {files.map(file => {
        const withInsavedMark = unsaveIds.includes(files.id)
        const fClass = classNames({
          'nav-link': true,
          'active': file.id === activeId,
          'withUnsaved': withInsavedMark
        })
        return (
          <li className="nav-item" key={file.id}>
            <a href="#" className={fClass} onClick={e => { e.preventDefault(); onTabClick(file.id) }}>
              {file.title}
              <span className="col-2 close-icon" onClick={e => { e.stopPropagation(); onTabClose(file.id) }}>
                <FontAwesomeIcon icon={faTimes} title="关闭" />
              </span>
              {withInsavedMark && <span className="rounded-circle unsaved-icon ml-2"></span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func.isRequired,
  onTabClose: PropTypes.func.isRequired,
}
TabList.defaultProps = {
  unsaveIds: []
}
export default TabList