import sytles from './Layout.module.css';

function Layout(props) {
  return (
    <div className={sytles.app}>
      {props.children}
    </div>
  )
}

function LayoutHeader(props) {
  return (
    <div className={sytles.header}>
      {props.children}
    </div>
  )
}

function LayoutContent(props) {
  return (
    <div className={sytles.content}>
      {props.children}
    </div>
  )
}

export default Object.assign(Layout,
  {
    Header: LayoutHeader,
    Content: LayoutContent,
  }
)