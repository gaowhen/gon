import klas from 'classnames'

export default function TableGuide(props) {
  const {
    showTableGuide,
    toggleTableGuide,
  } = props

  const guideClass = klas('c-table-guide', {
    on: showTableGuide,
  })

  return (
    <div className={guideClass} onClick={() => toggleTableGuide(false)}></div>
  )
}

TableGuide.propTypes = {
  showTableGuide: React.PropTypes.bool.isRequired,
  toggleTableGuide: React.PropTypes.func.isRequired,
}
