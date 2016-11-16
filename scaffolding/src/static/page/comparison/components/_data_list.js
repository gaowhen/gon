import { getWithUnit } from 'js/util/_number'

class DataList extends React.Component {
  renderTbody({ data }) {
    return (
      <tbody>
        {data.reverse().map((row, i) => (
          <tr key={i}>
            {row.map((d, idx) => {
              if (idx === 0) {
                return (
                  <td key={idx}>
                    <span>{d}</span>
                    <br />
                    <span>{Gon.formatDate(d, { format: 'ddd' })}</span>
                  </td>
                  )
              }

              const number = getWithUnit(d)
              return <td key={idx}>{number.value}{number.unit}</td>
            })}
          </tr>
          )
        )}
      </tbody>
    )
  }

  render() {
    const {
      titleData,
      data,
    } = this.props

    return (
      <table className="c-data-list">
        <thead>
          <tr>
            {titleData.map((title, idx) => <th key={idx}>{title}</th>)}
          </tr>
        </thead>
        {this.renderTbody({ data })}
      </table>
    )
  }
}

DataList.propTypes = {
  titleData: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
}

export default DataList
