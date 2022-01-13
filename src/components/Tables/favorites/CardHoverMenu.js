import React from "react";
import CardMoreMenu from "./CardMoreMenu";
import CardHoverButton from "./CardHoverButton";

const evStop = ev => {
  ev.preventDefault();
  ev.stopPropagation();
  ev.nativeEvent.stopImmediatePropagation();
};
//----==============-----------------------------------
class CardHoverMenu extends React.Component {
  state = { hiddenPopupMenu: true };
  toggle = () => {
    this.setState({ hiddenPopupMenu: !this.state.hiddenPopupMenu });
  };
  clkBtn = (ev, msg) => {
    evStop(ev);
    this.props.flashFn(msg);
  };
  render() {
    const p = {
      funcs: {
        viewBoard: e => this.clkBtn(e, "viewBoard"),
        pinAny: e => this.clkBtn(e, "pinAny"),
        pinHere: e => this.clkBtn(e, "pinHere"),
        notInterested: e => this.clkBtn(e, "notInterested"),
        shareCard: e => this.clkBtn(e, "shareCard")
      }
    };
    //Above is hardwired for demo. Normally, const p = this.props;
    return (
      <div className="whenhovered" onClick={this.toggle}>
        <CardMoreMenu
          funcs={p.funcs}
          hidden={this.state.hiddenPopupMenu}
          toggle={this.toggle}
        />
        {this.state.hiddenPopupMenu && (
          <div>
            <div className="mt-5 pt-5" />
            <div className="mt-5" />
            <CardHoverButton
              txt="VIEW BOARD"
              icon="eye"
              clicked={p.funcs.viewBoard}
            />
            <CardHoverButton
              txt="PIN"
              icon="thumbtack"
              clicked={p.funcs.pinAny}
            />
            <CardHoverButton
              txt="SHARE"
              icon="share"
              clicked={p.funcs.shareCard}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CardHoverMenu;