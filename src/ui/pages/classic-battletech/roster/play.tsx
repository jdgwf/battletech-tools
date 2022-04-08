import React from 'react';
import { CrosshairArrow, HotSurface } from 'react-game-icons';
import { FaArrowCircleLeft, FaCheckSquare, FaDice, FaGift, FaQuestionCircle, FaShoePrints, FaSquare } from "react-icons/fa";
import { GiBattleAxe, GiMissileSwarm } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { BattleMech, IGATOR, ITargetToHit } from "../../../../classes/battlemech";
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import InputCheckbox from '../../../components/form_elements/input_checkbox';
import InputField from '../../../components/form_elements/input_field';
import InputNumeric from '../../../components/form_elements/input_numeric';
import StandardModal from '../../../components/standard-modal';
import StatBar from "../../../components/stat-bar";
import BattleMechSVG from "../../../components/svg/battlemech-svg";
import DieSVG from "../../../components/svg/die-svg";
import TextSection from "../../../components/text-section";
import './play.scss';

export default class ClassicBattleTechRosterPlay extends React.Component<IPlayProps, IPlayState> {
    constructor(props: IPlayProps) {
        super(props);

        this.state = {
            updated: false,
            mechSelectorExpanded: false,

            setMovementDialog: null,
            setMovementMode: "",
            setMovementNumber: 0,
            setMovementCanJump: false,
            setMovementJumpingMP: 0,

            takeDamageDialog: null,
            resolveFireDialog: false,


            setTargetDialog: null,
            targetData: null,
            viewGATOR: null,
        };

        this.props.appGlobals.makeDocumentTitle("Playing CBT Force");
    }

    toggleResolved = (
      e: React.FormEvent<HTMLButtonElement>,
      bm: BattleMech,
      eq_index: number
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if(this.props.appGlobals.currentCBTForce) {
        let currentCBTForce = this.props.appGlobals.currentCBTForce;

        bm.toggleResolved( eq_index );
        this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
      }
    }

    setTurn = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if(this.props.appGlobals.currentCBTForce) {
        let currentCBTForce = this.props.appGlobals.currentCBTForce;
        currentCBTForce.turn = +e.currentTarget.value;

        this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
      }
      this.setState({
        updated: true,
      })
    }

    setPhase = (
      e: React.FormEvent<HTMLButtonElement>,
      nv: number
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if(this.props.appGlobals.currentCBTForce) {
        let currentCBTForce = this.props.appGlobals.currentCBTForce;
        currentCBTForce.phase = nv;

        this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
      }

      this.setState({
        updated: true,
      })


    }

    toggleHelp = (
      e: React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if(this.props.appGlobals.currentCBTForce) {
        let currentCBTForce = this.props.appGlobals.currentCBTForce;
        currentCBTForce.hideHelp = !currentCBTForce.hideHelp;

        this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
      }


    }

    openResolveFireDialog = (
      e: React.FormEvent<HTMLButtonElement>,
      ) => {
        if( e && e.preventDefault ) {
          e.preventDefault();
        }

      this.setState({
        resolveFireDialog: true,
      })
    }

    closeResolveFireDialog = (
      e: React.FormEvent<HTMLButtonElement>,
      ) => {
        if( e && e.preventDefault ) {
          e.preventDefault();
        }

      this.setState({
        resolveFireDialog: false,
      })
    }

    nextTurn = (
      e: React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if(this.props.appGlobals.currentCBTForce) {
        let currentCBTForce = this.props.appGlobals.currentCBTForce;
        currentCBTForce.phase = 0;
        currentCBTForce.turn++;

        for( let group of currentCBTForce.groups ) {
          for( let unit of group.members ) {
            unit.turnReset();
          }
        }

        this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );

        this.setState({
          updated: true,
        })
      }


    }

    updateTargetActive = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.active = e.currentTarget.checked;
        } else if( target === "b" ) {
          targetData.b.active = e.currentTarget.checked;
        } else if( target === "c" ) {
          targetData.c.active = e.currentTarget.checked;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    updateTargetName = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.name = e.currentTarget.value;
        } else if( target === "b" ) {
          targetData.b.name = e.currentTarget.value;
        } else if( target === "c" ) {
          targetData.c.name = e.currentTarget.value;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    viewGATOR = (
      gator: IGATOR,
    ) => {
      this.setState({
        viewGATOR: gator,
      })
    }

    closeGATOR = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      this.setState({
        viewGATOR: null,
      })
    }

    updateTargetJumped = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.jumped = e.currentTarget.checked;
        } else if( target === "b" ) {
          targetData.b.jumped = e.currentTarget.checked;
        } else if( target === "c" ) {
          targetData.c.jumped = e.currentTarget.checked;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    updateTargetRange = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.range = +e.currentTarget.value;
        } else if( target === "b" ) {
          targetData.b.range = +e.currentTarget.value;
        } else if( target === "c" ) {
          targetData.c.range = +e.currentTarget.value;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    updateTargetOtherMods = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.otherMods = +e.currentTarget.value;
        } else if( target === "b" ) {
          targetData.b.otherMods = +e.currentTarget.value;
        } else if( target === "c" ) {
          targetData.c.otherMods = +e.currentTarget.value;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    updateTargetMovement = (
      e: React.FormEvent<HTMLInputElement>,
      target: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      let targetData = this.state.targetData;
      if( targetData ) {
        if( target === "a" ) {
          targetData.a.movement = +e.currentTarget.value;
        } else if( target === "b" ) {
          targetData.b.movement = +e.currentTarget.value;
        } else if( target === "c" ) {
          targetData.c.movement = +e.currentTarget.value;
        }
      }

      this.setState({
        targetData: targetData,
      })
    }

    selectMech = (
      e: React.FormEvent<HTMLButtonElement>,
      uuid: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      if(this.props.appGlobals.currentCBTForce) {
        this.props.appGlobals.currentCBTForce.setSelectedMech( uuid );

        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }

    }

    openSetTarget = (
      currentBM: BattleMech,
    ) => {

      if( this.props.appGlobals.currentCBTForce && currentBM ) {
        let targetData = {
          a: JSON.parse(JSON.stringify(currentBM.getTarget("a"))),
          b: JSON.parse(JSON.stringify(currentBM.getTarget("b"))),
          c: JSON.parse(JSON.stringify(currentBM.getTarget("c"))),
        }

        this.setState({
          setTargetDialog: currentBM,
          setMovementDialog: null,
          takeDamageDialog: null,
          targetData: targetData,
        })
      }

    }

    closeSetTarget  = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.setState({
        setTargetDialog: null,
        targetData: null,
      })
    }

    setTarget = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      let currentBM: BattleMech | null = this.state.setTargetDialog;
      if( this.props.appGlobals.currentCBTForce && currentBM && this.state.targetData ) {
        currentBM.setTargets(
          this.state.targetData.a,
          this.state.targetData.b,
          this.state.targetData.c,
        );

        this.props.appGlobals.currentCBTForce.updateUnitViaUUID( currentBM )

        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }

      this.setState({
        setTargetDialog: null,
        targetData: null,
      })
    }

    openTakeDamage = (
      currentBM: BattleMech
    ) => {

      this.setState({
        takeDamageDialog: currentBM,
        setMovementDialog: null,
        setTargetDialog: null,
      })
    }
    closeTakeDamage  = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.setState({
        takeDamageDialog: null,
      })
    }
    takeDamage = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.setState({
        takeDamageDialog: null,
      })
    }

    _getCurrentBM = (): BattleMech | null => {
      if( this.props.appGlobals && this.props.appGlobals.currentCBTForce ) {
          return this.props.appGlobals.currentCBTForce.getSelectedMech();
      }
      return null;
    }

    onChange = (nv: BattleMech ): void => {

      if( this.props.appGlobals.currentCBTForce ) {
        let currentBM: BattleMech | null = this.props.appGlobals.currentCBTForce.getSelectedMech();
        if( currentBM ) {
          currentBM = nv;
          this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
        }
      }
    }

    openSetMovement = (
      currentBM: BattleMech
    ) => {

      this.setState({
        setMovementDialog: currentBM,
        setMovementMode: currentBM ? currentBM.currentMovementMode : "",
        setMovementNumber: currentBM ? currentBM.currentToHitMovementModifier : 0,
        setMovementCanJump: currentBM && currentBM.getJumpSpeed() > 0 ? true : false,
        setTargetDialog: null,
        takeDamageDialog: null,
      })
    }
    closeSetMovement  = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.setState({
        setMovementDialog: null,
      })
    }
    setMovement = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }


      if( this.props.appGlobals.currentCBTForce ) {

        // let currentBM: BattleMech | null = this.props.appGlobals.currentCBTForce.getUnitViaUUID( this.state.setMovementDialog?.uuid );
        if( this.state.setMovementDialog ) {
          let currentBM = this.state.setMovementDialog;
          currentBM.currentMovementMode = this.state.setMovementMode;
          currentBM.currentToHitMovementModifier = this.state.setMovementNumber;
          if( currentBM.currentMovementMode === "j")
            currentBM.currentTargetJumpingMP = this.state.setMovementJumpingMP;
          else
            currentBM.currentTargetJumpingMP = 0
          this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
        } else {
          console.error("setMovement Can't find UUID ", this.state.setMovementDialog)
        }
      }

      this.setState({
        setMovementDialog: null,
      })
    }

    setMovementMode = (
      e: React.FormEvent<HTMLButtonElement>,
      nv: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      if( nv === "" ) {

        this.setState({
          setMovementMode: nv,
          setMovementNumber: 0,
          setMovementJumpingMP: 0,
        })
      } else {
        this.setState({
          setMovementMode: nv,

        })
      }

    }

    setMovementNumber = (
      e: React.FormEvent<any>,
      nv: number
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      let setMovementJumpingMP = 0;
      if( nv > 5 ) {
        setMovementJumpingMP = 25
      } else if( nv > 4 ) {
        setMovementJumpingMP = 18
      } else if( nv > 3 ) {
        setMovementJumpingMP = 10
      } else if( nv > 2 ) {
        setMovementJumpingMP = 7
      } else if( nv > 1 ) {
        setMovementJumpingMP = 5
      } else if( nv > 0 ) {
        setMovementJumpingMP = 3
      }
      this.setState({
        setMovementNumber: nv,
        setMovementJumpingMP: setMovementJumpingMP,
      })
    }

    updateMovementJumpingMP = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      let setMovementNumber = 0;
      if( +e.currentTarget.value >= 25 ) {
        setMovementNumber = 6
      } else if( +e.currentTarget.value >= 18 ) {
        setMovementNumber = 5
      } else if( +e.currentTarget.value >= 10 ) {
        setMovementNumber = 4
      } else if( +e.currentTarget.value >= 7 ) {
        setMovementNumber = 3
      } else if( +e.currentTarget.value >= 5 ) {
        setMovementNumber = 2
      } else if( +e.currentTarget.value >= 3 ) {
        setMovementNumber = 1
      }

      this.setState({
        setMovementJumpingMP: +e.currentTarget.value,
        setMovementNumber: setMovementNumber,
      })
    }


    closeTargetDialog = (
      e: React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentCBTForce) {
        return <></>;
      }
      let selectedMech: BattleMech | null = this.props.appGlobals.currentCBTForce.getSelectedMech();
      return (
        <>

{this.state.resolveFireDialog && this.props.appGlobals.currentCBTForce ? (
  <StandardModal
    show={true}
    className="modal-xl"
    onClose={this.closeResolveFireDialog}
    title={"Resolving Attacks for Turn #" + this.props.appGlobals.currentCBTForce.turn}
  >
    {this.props.appGlobals.currentCBTForce.groups.map( (group, groupIndex) => {
      return (
        <div key={groupIndex}>
          <h2>{group.getName(groupIndex)}</h2>
          {group.members.map( (unit, unitIndex) => {
            let numberOfAttacks = 0;
            for( let attack of unit.sortedSeparatedEquipmentList ) {
              if( attack.target ) {
                numberOfAttacks++;
              }
            }
            return <fieldset className="fieldset" key={unitIndex}>
              <legend>{unit.getName()}</legend>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Weapon</th>
                    <th>Target</th>
                    <th className="min-width">G</th>
                    <th className="min-width">A</th>
                    <th className="min-width">T</th>
                    <th className="min-width">O</th>
                    <th className="min-width">R</th>
                    <th className="min-width no-wrap">To-Hit</th>
                    <th className="min-width no-wrap">Damage</th>
                    <th className="min-width no-wrap"></th>
                  </tr>
   
                </thead>
                {numberOfAttacks === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={9}>
                        This unit has no attacks declared
                      </td>
                    </tr>

                  </tbody>
                ) : (
                  <>
                    {unit.sortedSeparatedEquipmentList.map( (attack, attackIndex) => {
                      let attackGATOR = unit.getTargetToHitFromWeapon(
                          attackIndex,
                      )
                      if( !attack.isAmmo && !attack.isEquipment && attackGATOR.target ) {

                        let attackDamage = attack.damage ? attack.damage.toString() : "";
                        let attackDamageSecondLine = "";
                        if( attack.damagePerShot ) {
                          attackDamage += "/shot";
                        }

                        if( attack.damageClusters ) {
                          attackDamage += attack.damageClusters.toString() + " clusters";
                          if( attack.damagePerCluster )
                            attackDamageSecondLine = attack.damagePerCluster.toString() + " damage/hit";
                        }
                        
                        return (
                          <tbody key={attackIndex}>
                            <tr>
                              <td>{attackGATOR.weaponName}</td>
                              <td>{attackGATOR.targetName ? (
                                <>{attackGATOR.targetName}<div className="small-text">{attackGATOR.target}</div></>
                              ) : (
                                <>{attackGATOR.target}</>
                              )}</td>

                              <td>{attackGATOR.gunnerySkill}</td>
                              <td>{attackGATOR.attackerMovementModifier}</td>
                              <td>{attackGATOR.targetMovementModifier}</td>
                              <td>{attackGATOR.otherModifiers}</td>
                              <td>{attackGATOR.rangeModifier}</td>
                              <td><strong>{attackGATOR.finalToHit}+</strong></td>


                              <td className="min-width no-wrap">
                                {attackDamage}<br />
                                {attackDamageSecondLine}
                              </td>

                              <td className="min-width no-wrap">
                                <button
                                  className={attack.resolved ? "btn btn-success btn-sm" : "btn btn-warning btn-sm"}
                                  onClick={(e) => this.toggleResolved(e, unit, attackIndex)}
                                  title="Click here to make this attack as resolved"
                                >
                                  {attack.resolved ? 
                                  <FaCheckSquare />
                                  :
                                  <FaSquare /> }
                                </button>
                              </td>
                              
                            </tr>
                          </tbody>
                        )
                      }
                    })}
                  </>
                )}
              </table>
            </fieldset>
          })}
        </div>
      )
    })}
  </StandardModal>
) : null}
<StandardModal
  show={this.state.viewGATOR ? true : false}
  onClose={this.closeGATOR}
  title={(this.state.viewGATOR &&
    this.state.viewGATOR.weaponName) ? (
      "" + this.state.viewGATOR.weaponName + ( this.state.viewGATOR?.target ? " vs " + this.state.viewGATOR.target : "")
    ) : (
      "GATOR Calculations"
    )}
>
  {this.state.viewGATOR ? (
    <table className="table text-center">
      <thead>
        <tr>
          <th style={{width: "14%"}}>G</th>
          <th style={{width: "14%"}}>A</th>
          <th style={{width: "14%"}}>T</th>
          <th style={{width: "14%"}}>O</th>
          <th style={{width: "14%"}}>R</th>
          <th style={{width: "14%"}}>&nbsp;</th>
          <th style={{width: "14%"}}>To-Hit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{this.state.viewGATOR.gunnerySkill}</td>
          <td>{this.state.viewGATOR.attackerMovementModifier}</td>
          <td>{this.state.viewGATOR.targetMovementModifier}</td>
          <td>
            {this.state.viewGATOR.otherModifiers}

            {this.state.viewGATOR.otherModifiersExplanation ? (
              <>
              <div className="small-text">
                {this.state.viewGATOR.otherModifiersExplanation}
              </div>
              </>
            ) : null}
          </td>
          <td>
            {this.state.viewGATOR.rangeModifier}
            {this.state.viewGATOR.rangeExplanation ? (
              <>
              <div className="small-text">
                {this.state.viewGATOR.rangeExplanation}
              </div>
              </>
            ) : null}
          </td>
          <td>&nbsp;</td>
          <td>
            {this.state.viewGATOR.finalToHit > -1 ? (
              <>
                {this.state.viewGATOR.finalToHit}+
              </>
            ) : (
              <>
                No Shot!
              </>
            )}

          </td>
        </tr>
      </tbody>

            {this.state.viewGATOR.explanation ? (
              <>
                <tfoot>
                  <tr>
                    <th colSpan={7}>
                  {this.state.viewGATOR.explanation}
                  </th>
                  </tr>
                </tfoot>
              </>
            ) : null
            }

    </table>
  ) : null}
</StandardModal>
{this.state.setMovementDialog ? (
<StandardModal
  show={true}
  onClose={this.closeSetMovement}
  onSave={this.setMovement}
  saveDisabled={this.state.setMovementMode === "n" || this.state.setMovementNumber < 0}
  title={this.state.setMovementDialog.getName() + " Movement Info"}
>


    <div className="flex">
      <div className="text-center">
      <button
        className={this.state.setMovementMode === "" ? "btn btn-primary" : "btn"}
        onClick={(e) => this.setMovementMode(e, "")}
      >
    <svg
      width={40}
      height={40}
      >
      <DieSVG
        posX={0}
        posY={0}
        width={40}
        bgColor="#009"
        pipColor="white"
        numberPips={0}
      />
      </svg><br />
      Stationary
      </button>
      <br />
      <button
        className={this.state.setMovementMode === "w" ? "btn btn-primary" : "btn"}
        onClick={(e) => this.setMovementMode(e, "w")}
      >
    <svg
      width={40}
      height={40}
      >
      <DieSVG
        posX={0}
        posY={0}
        width={40}
        bgColor="white"
        pipColor="black"
        numberPips={1}
      />
      </svg><br />
      Walk: {this.state.setMovementDialog.getWalkSpeed()}
      </button>
      <br />
    <button
        className={this.state.setMovementMode === "r" ? "btn btn-primary" : "btn"}
        onClick={(e) => this.setMovementMode(e, "r")}
      >
    <svg
      width={40}
      height={40}
      >
    <DieSVG
        posX={0}
        posY={0}
        width={40}
        bgColor="black"
        pipColor="white"
        numberPips={2}
      />
      </svg><br />
      Run:  {this.state.setMovementDialog.getRunSpeed()}
      </button>
      <br />
    {this.state.setMovementCanJump ? (
      <>
    <button
        className={this.state.setMovementMode === "j" ? "btn btn-primary" : "btn"}
        onClick={(e) => this.setMovementMode(e, "j")}
      >
      <svg
      width={40}
      height={40}
      >
    <DieSVG
        posX={0}
        posY={0}
        width={40}
        bgColor="red"
        pipColor="white"
        numberPips={3}
      />
      </svg><br />
      Jump:  {this.state.setMovementDialog.getJumpSpeed()}
      </button>
      </>
    ) : null}

      </div>
      <div className="grow">
        <table className="table text-center">
          <thead>
            <tr>
              <th colSpan={2}>
                Movement Modifier Table
                <div className="small-text">Click a line below to select</div>
              </th>
            </tr>

            <tr>
              <th>Move (hexes)</th>
              <th>Mod</th>
            </tr>
          </thead>
          <tbody className={this.state.setMovementNumber === 0 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 0)}>
              <td>0-2</td>
              <td>0</td>
            </tr>
          </tbody>
          <tbody className={this.state.setMovementNumber === 1 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 1)}>
              <td>3-4</td>
              <td>+1</td>
            </tr>
            </tbody>
            <tbody className={this.state.setMovementNumber === 2 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 2)}>
              <td>5-6</td>
              <td>+2</td>
            </tr>
            </tbody>
            <tbody className={this.state.setMovementNumber === 3 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 3)}>
              <td>7-9</td>
              <td>+3</td>
            </tr>
            </tbody>
            <tbody className={this.state.setMovementNumber === 4 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 4)}>
              <td>10-17</td>
              <td>+4</td>
            </tr>
            </tbody>
          <tbody className={this.state.setMovementNumber === 5 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 5)}>
              <td>18-24</td>
              <td>+5</td>
            </tr>
            </tbody>
          <tbody className={this.state.setMovementNumber === 6 ? "highlighted" : ""}>
            <tr className="cursor-pointer" onClick={(e) => this.setMovementNumber(e, 6)}>
              <td>25+</td>
              <td>+6</td>
            </tr>
          </tbody>
          {this.state.setMovementMode === "j" ? (
            <tfoot>
              <tr>
                <th colSpan={2} className="small-text">
                  Jump bonus will be be included on in-play sheet
                </th>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>



  </div>
  {this.state.setMovementMode === "j" ? (
        <div className="text-center">
        <InputNumeric
          label="Jumping MP Used (for heat calculation)"
          value={this.state.setMovementJumpingMP}
          onChange={this.updateMovementJumpingMP}
          description="Changing this will also set the movement modifer above, so you don't have to perform two clicks."
          inline={true}
          min={0}
          max={30}
          step={1}
        />
        </div>
  ) : null}
</StandardModal>
      ) : null}
{this.state.setTargetDialog ? (
<StandardModal
  show={true}
  onClose={this.closeSetTarget}
  onSave={this.setTarget}
  title={this.state.setTargetDialog.getName() + " Target Selection"}
>
  {this.state.targetData ? (
    <>
      <fieldset className="fieldset">
        <legend>Target A</legend>
        <div className="row">
          <div className="col">
            <InputCheckbox
              label="Active"
              checked={this.state.targetData.a.active}
              description='Whether this target slot is active. Unchecking will keep it from being cycled in the Equipment button'
              onChange={(e) => this.updateTargetActive(e, "a")}
            />
            <InputField
              label="Label"
              description='Just a casual name for the target, or the make, something to help remind you which is A, B, or C'
              value={this.state.targetData.a.name}
              onChange={(e) => this.updateTargetName(e, "a")}
            />
          </div>
          <div className="col">

          <InputNumeric
          label="Movement Mod"
          description='Your opponent will tell you this'
          value={this.state.targetData.a.movement}
          onChange={(e) => this.updateTargetMovement(e, "a")}
          step={1}
          min={0}
          max={50}
          inline={true}
        />

        <InputNumeric
          label="Other Mods"
          description='Trees, Water, other cover, etc'
          value={this.state.targetData.a.otherMods}
          onChange={(e) => this.updateTargetOtherMods(e, "a")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
        <InputNumeric
          label="Range"
          description='The number of hexes between your target'
          value={this.state.targetData.a.range}
          onChange={(e) => this.updateTargetRange(e, "a")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
          </div>
        </div>

      </fieldset>
      <fieldset className="fieldset">
        <legend>Target B</legend>
        <div className="row">
          <div className="col">
            <InputCheckbox
              label="Active"
              description='Whether this target slot is active. Unchecking will keep it from being cycled in the Equipment button'
              checked={this.state.targetData.b.active}
              onChange={(e) => this.updateTargetActive(e, "b")}
            />
            <InputField
              label="Label"
              description='Just a casual name for the target, or the make, something to help remind you which is A, B, or C'
              value={this.state.targetData.b.name}
              onChange={(e) => this.updateTargetName(e, "b")}
            />
          </div>
          <div className="col">

          <InputNumeric
          label="Movement Mod"
          description='Your opponent will tell you this'
          value={this.state.targetData.b.movement}
          onChange={(e) => this.updateTargetMovement(e, "b")}
          step={1}
          min={0}
          max={50}
          inline={true}
        />

        <InputNumeric
          label="Other Mods"
          description='Trees, Water, other cover, etc'

          value={this.state.targetData.b.otherMods}
          onChange={(e) => this.updateTargetOtherMods(e, "b")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
        <InputNumeric
          label="Range"
          description='The number of hexes between your target'
          value={this.state.targetData.b.range}
          onChange={(e) => this.updateTargetRange(e, "b")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
          </div>
        </div>

      </fieldset>
      <fieldset className="fieldset">
        <legend>Target C</legend>
        <div className="row">
          <div className="col">
            <InputCheckbox
              label="Active"
              description='Whether this target slot is active. Unchecking will keep it from being cycled in the Equipment button'
              checked={this.state.targetData.c.active}
              onChange={(e) => this.updateTargetActive(e, "c")}
            />
            <InputField
              label="Label"
              description='Just a casual name for the target, or the make, something to help remind you which is A, B, or C'
              value={this.state.targetData.c.name}
              onChange={(e) => this.updateTargetName(e, "c")}
            />
          </div>
          <div className="col">

          <InputNumeric
          label="Movement Mod"
          description='Your opponent will tell you this'
          value={this.state.targetData.c.movement}
          onChange={(e) => this.updateTargetMovement(e, "c")}
          step={1}
          min={0}
          max={50}
          inline={true}
        />

        <InputNumeric
          label="Other Mods"
          description='Trees, Water, other cover, etc'

          value={this.state.targetData.c.otherMods}
          onChange={(e) => this.updateTargetOtherMods(e, "c")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
        <InputNumeric
          label="Range"
          description='The number of hexes between your target'
          value={this.state.targetData.c.range}
          onChange={(e) => this.updateTargetRange(e, "c")}
          step={1}
          inline={true}
          min={0}
          max={50}
        />
          </div>
        </div>

      </fieldset>
    </>
  ) : null}

</StandardModal>
) : null}
<StandardModal
  show={this.state.takeDamageDialog !== null}
  onClose={this.closeTakeDamage}
  onSave={this.takeDamage}
  title="Take Damage"
>
        Take Damage Dialog
</StandardModal>
          <header className="topmenu">
            <ul className="main-menu">
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/classic-battletech/roster`}><FaArrowCircleLeft /></Link></li>
                {/* <li>
                  <span

                  >
                    <FaBars />
                  </span>
                </li> */}
                                {/* <li className="small-text text-center">
                                <br />



                </li> */}
                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>

          </header>
<div className="page-container">
<div className="record-sheet-column">
<div
  className="alert alert-danger"
>
 Although improving, this area <strong>DOES NOT WORK!</strong> However, much progress has been made on Target, per weapon GATOR, and movement.
  <br />Next up: Taking Damage, After that, turn progress (or vice/versa)
</div>
<div>
<TextSection

>
  <div className="turn-counter">
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.hideHelp ? "btn btn-secondary btn-sm" : "btn btn-primary btn-sm"}
          onClick={this.toggleHelp}
          title="Click here to toggle the help text below"
        >
          {this.props.appGlobals.currentCBTForce.hideHelp ?
          <FaQuestionCircle /> : <FaQuestionCircle /> }
        </button>
      </div>
      <div>
        <InputNumeric
          step={1}
          min={1}
          max={100}
          value={this.props.appGlobals.currentCBTForce.turn}
          inline={true}
          title="Turn #"
          label="Turn #"
          onChange={this.setTurn}
        />
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 0 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 0)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(0)}
        >
          <FaDice />
        </button>
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 1 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 1)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(1)}
        >
          <FaShoePrints />
        </button>
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 2 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 2)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(2)}

        >
          <GiMissileSwarm />
        </button>
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 3 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 3)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(3)}
        >
          <GiBattleAxe />
        </button>
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 4 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 4)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(4)}
        >
          <HotSurface />
        </button>
      </div>
      <div>
        <button
          className={this.props.appGlobals.currentCBTForce.phase === 5 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          onClick={(e) => this.setPhase(e, 5)}
          title={this.props.appGlobals.currentCBTForce.getPhaseName(5)}
        >
          <FaGift />
        </button>
      </div>
      <div className="grow-2">
        <h5>{this.props.appGlobals.currentCBTForce.getPhaseName(this.props.appGlobals.currentCBTForce.phase)}</h5>
      </div>

      {this.props.appGlobals.currentCBTForce.phase === 4 ? (
        <div className="grow-1">
          <button
            className="btn btn-sm btn-primary"
          >
            Apply Heat
          </button>
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 5 ? (
        <div className="grow-1">
          <button
            className="btn btn-sm btn-primary"
            onClick={this.nextTurn}
          >
            Next Turn
          </button>
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 2 ? (
        <div className="grow-1">
          <button
            className="btn btn-sm btn-primary"
            onClick={this.openResolveFireDialog}
          >
            Resolve Fire
          </button>
        </div>
      ) : null}
</div>
{!this.props.appGlobals.currentCBTForce.hideHelp ? (
  <div className="text-center">
    <hr />
  {this.props.appGlobals.currentCBTForce.phase === 0 ? (
        <div>
            One player from each side rolls 2D6 and adds the results
  together to determine their side’s Initiative. The side with the higher
  result wins Initiative for that turn. Re-roll all ties.
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 1 ? (
        <div>
          Move your mechs as per standard rules. Click on the Blue Movement section below Weapons and Equipent for each moving 'mech. Set the Movement mode, and the to-hit modifier for each unit.
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 2 ? (
        <div>
          Declare all of your Weapon Attacks by setting a Target and then cycling through each weapon to be an "A", "B", or "C" a blank circle means the weapon will not be fired. Once all declarations are done, click on the "Resolve Fire" button above. A list of 'mech weapons, attacks, targets, damage, and to-hit roll needed will pop up.
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 3 ? (
        <div>
          Make physical attacks as per the rule book.
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 4 ? (
        <div>
          Click on the "Apply Heat" button above to add heat from movement, damage, etc and then subtract heat via heat sinks.
        </div>
      ) : null}
      {this.props.appGlobals.currentCBTForce.phase === 5 ? (
        <div>
          This turn's a wrap! Click on "Next Turn" above and we'll clear out the Movement for all 'mechs, increment the turn counter, and start a new turn.
        </div>
      ) : null}
  </div>
) : null}

</TextSection>

<div className="selected-mech">
          {selectedMech ? (
              <BattleMechSVG
                mechData={selectedMech}
                inPlay={true}
                //@ts-ignore
                openSetTarget={() => this.openSetTarget(selectedMech)}
                //@ts-ignore
                openTakeDamage={() => this.openTakeDamage(selectedMech)}
                //@ts-ignore
                openSetMovement={() => this.openSetMovement(selectedMech)}
                onChange={this.onChange}
                viewGATOR={this.viewGATOR}
                currentPhase={this.props.appGlobals.currentCBTForce.phase}
              />
          ) : (
            <div className="text-center">
              <TextSection>
                (No Selected 'Mech)
              </TextSection>
            </div>
          )}
            </div>
</div>

</div>
<div className="sidebar">

  <div className={this.state.mechSelectorExpanded ? "mech-selector" : "mech-selector expanded"}>
          {this.props.appGlobals.currentCBTForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div>
                  <div className="lance-name">{group.getName(groupIndex)}</div>
                  <ul className="mech-list">
                  {group.members.map( (unit, unitIndex) => {
                    let dieBG = "#009";
                    let dieFG = "white";
                    let diePips = unit.currentToHitMovementModifier;

                    if( unit.currentMovementMode === "n" ) {
                      dieBG = "green";
                      dieFG = "white";
                    }

                    if( unit.currentMovementMode === "w" ) {
                      dieBG = "white";
                      dieFG = "black";
                    }
                    if( unit.currentMovementMode === "r" ) {
                      dieBG = "black";
                      dieFG = "white";
                    }
                    if( unit.currentMovementMode === "j" ) {
                      dieBG = "red";
                      dieFG = "white";
                      diePips++;
                    }

                    return (
                        <li key={unitIndex}>
                          <button
                            onClick={(e) => this.selectMech(e, unit.uuid)}
                            className={selectedMech && selectedMech.uuid === unit.uuid ? "btn btn-sm btn-primary full-width" : "btn btn-sm btn-secondary full-width"}
                            title={"Select " + unit.getName()}
                          >
                            {unit.getName()}

                            <div className="stats">
                              <div
                                className="move"
                                title="This is the mech's movement status, the color indicates the last movement method, the number is the to-hit movement modifiers as a target including the +1 jump modifier if the 'mech jumped."
                              >
                                <svg
                                  height={20}
                                  width={20}

                                >
                                  <DieSVG
                                    posX={0}
                                    posY={0}
                                    width={20}
                                    bgColor={dieBG}
                                    pipColor={dieFG}
                                    numberPips={diePips}
                                    numericPips={true}
                                  />
                                </svg>

                              </div>
                              <div className="bars">
                                <StatBar
                                  color="black"
                                  background="#aaa"
                                  currentPercentage={unit.getArmorPercentage()}
                                  height={8}
                                  title="Current Armor Status"
                                />
                                <StatBar
                                  color="white"
                                  background="#aaa"
                                  currentPercentage={unit.getStructurePercentage()}
                                  height={8}
                                  title="Current Internal Structure Status"
                                />
                                <StatBar
                                  color="red"
                                  background="#aaa"
                                  currentPercentage={unit.getHeatPercentage()}
                                  height={8}
                                  title="Current Heat Status"
                                />
                              </div>
                            </div>

                          </button>
                          <div className="flex">
                            <div className="grow">
                            <button
                              className={this.props.appGlobals.currentCBTForce?.phase === 1 ? unit.currentMovementMode === "n" ? "btn btn-sm btn-success full-width" : "btn btn-sm btn-primary full-width" : "btn btn-sm btn-secondary full-width"}
                              onClick={(e) => this.openSetMovement(unit)}
                              title={"Open the Movement Dialog for " + unit.getName()}
                            >
                              <FaShoePrints />
                            </button>
                            </div>
                            <div className="grow">
                              <button
                                className={this.props.appGlobals.currentCBTForce?.phase === 2 ? "btn btn-sm btn-primary full-width" : "btn btn-sm btn-secondary full-width"}
                                onClick={(e) => this.openSetTarget(unit)}
                                title={"Open the Target Dialog for " + unit.getName()}
                              >
                                <CrosshairArrow />
                              </button>
                            </div>
                          </div>
                        </li>
                    )
                  })}
                  </ul>



              </div>


            </React.Fragment>
            )
          })}
    </div>
    </div>
            </div>
        </>
      );
    }
}

interface IPlayProps {
  appGlobals: IAppGlobals;

}

interface IPlayState {
  updated: boolean;
  mechSelectorExpanded: boolean;

  setMovementDialog: BattleMech | null;
  setMovementMode: string;
  setMovementNumber: number;
  setMovementCanJump: boolean;
  setMovementJumpingMP: number;

  resolveFireDialog: boolean;

  takeDamageDialog: BattleMech | null;


  setTargetDialog: BattleMech | null;

  targetData: ICombinedTargetData | null;
  viewGATOR: IGATOR | null;
}

interface ICombinedTargetData {
  a: ITargetToHit;
  b: ITargetToHit;
  c: ITargetToHit;
}
