/*
 * The data here is/may be copyrighted and NOT included in the GPLv3 license.
 */

import { ASMULRole } from "../Classes/AlphaStrikeUnit";
import AlphaStrikeGroup from "../Classes/AlphaStrikeGroup";

export interface IFormationBonus {
    Name: string;
    IdealRole?: ASMULRole;
    IsValid(group:AlphaStrikeGroup): boolean;
    BonusDescription: string
    RequirementsDescription: string  
}

class FormationBonusBase {
    CheckIdealRole(group:AlphaStrikeGroup, role:string):boolean{
        for(let i=0; i<group.members.length; i++){
            if (group.members[i].role!==role)
            return false;
        }
        return true;
    }
    RoleCount(group:AlphaStrikeGroup, role:string):number{
        return group.members.filter(x=>x.role===role).length;
    }

}
class None extends FormationBonusBase implements IFormationBonus {
    Name: string="None"; 
    IsValid(group: AlphaStrikeGroup): boolean {
        return true;
    }
    BonusDescription: string="None";
    RequirementsDescription: string="None";


}
class BattleLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Battle Lance";
    IdealRole: ASMULRole = {Id:109, Name: "Brawler", Image:"", SortOrder:109};
    BonusDescription: string = "The Battle Lance formation receives the equivalent of a Lucky Special Pilot Ability (see p. 97) as a level of the number of units in the formation at Setup plus two. So a Lance of 4 ‘Mechs in a Battle Lance receives a 6-point Lucky Special Ability. It is useable by any unit in the Battle Lance, rather than limited to any single unit. This bonus ability may be stacked with a Lucky SPA assigned to one or more of the Battle Lance’s member units. But if this is done, the maximum number of rerolls a Battle Lance unit may attempt for the duration of the scenario— between both the pilot’s ability and that provided bythis formation bonus—is 4.";
    RequirementsDescription: string = "50 percent of the standard Battle Lance must be Size 3 or higher. If the Battle Lance is a vehicle formation, these Size 3+ units must also be pairs of the same vehicle model. At least three units in a Battle Lance must also be any combination of the Brawler, Sniper and/or Skirmisher unit roles.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (this.CheckIdealRole(group, this.IdealRole.Name)){
            return true;
        }
        let result =true;
        result = result && (Math.ceil(group.members.length*.50)<=group.members.filter(x=>x.size>=3).length);
        let brawlerSniperSkirmisherCount = this.RoleCount(group, "Brawler") + this.RoleCount(group, "Sniper")+this.RoleCount(group, "Skirmisher");
        result = result && (brawlerSniperSkirmisherCount >=3) 
        return result;
    }
    
}
class LightBattleLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Light Battle Lance";
    BonusDescription: string = "The Battle Lance formation receives the equivalent of a Lucky Special Pilot Ability (see p. 97) as a level of the number of units in the formation at Setup plus two. So a Lance of 4 ‘Mechs in a Battle Lance receives a 6-point Lucky Special Ability. It is useable by any unit in the Battle Lance, rather than limited to any single unit. This bonus ability may be stacked with a Lucky SPA assigned to one or more of the Battle Lance’s member units. But if this is done, the maximum number of rerolls a Battle Lance unit may attempt for the duration of the scenario— between both the pilot’s ability and that provided bythis formation bonus—is 4.";
    RequirementsDescription: string = "At least 75 percent of this Lance must be Size 1, and there may be no units of Size 4 of higher in this formation type. If this is a vehicle formation, there must be at least 2 matched pairs of Size 1 units. At least one of the units in a Light Battle Lance must be of the Scout unit role.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (group.members.filter(x=>x.size>=4).length>0){
            return false;
        }
        let result =true;
        result = result && (Math.ceil(group.members.length*.75)<=group.members.filter(x=>x.size===1).length);
        result = result && (this.RoleCount(group, "Scout")>=1);
        return result;
    }
    
}
class MediumBattleLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Medium Battle Lance";
    BonusDescription: string = "The Battle Lance formation receives the equivalent of a Lucky Special Pilot Ability (see p. 97) as a level of the number of units in the formation at Setup plus two. So a Lance of 4 ‘Mechs in a Battle Lance receives a 6-point Lucky Special Ability. It is useable by any unit in the Battle Lance, rather than limited to any single unit. This bonus ability may be stacked with a Lucky SPA assigned to one or more of the Battle Lance’s member units. But if this is done, the maximum number of rerolls a Battle Lance unit may attempt for the duration of the scenario— between both the pilot’s ability and that provided bythis formation bonus—is 4.";
    RequirementsDescription: string = "At least 50 percent of the Medium Battle Lance must be of Size 2, and there may be no units of Size 4 or larger in this formation at all. If this is a vehicle formation, there must be at least 2 matched pairs of Size 2 units.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (group.members.filter(x=>x.size>=4).length>0){
            return false;
        }
        let result =true;
        result = result && (Math.ceil(group.members.length*.50)<=group.members.filter(x=>x.size===2).length);
        return result;
    }
    
}
class HeavyBattleLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Heavy Battle Lance";
    BonusDescription: string = "The Battle Lance formation receives the equivalent of a Lucky Special Pilot Ability (see p. 97) as a level of the number of units in the formation at Setup plus two. So a Lance of 4 ‘Mechs in a Battle Lance receives a 6-point Lucky Special Ability. It is useable by any unit in the Battle Lance, rather than limited to any single unit. This bonus ability may be stacked with a Lucky SPA assigned to one or more of the Battle Lance’s member units. But if this is done, the maximum number of rerolls a Battle Lance unit may attempt for the duration of the scenario— between both the pilot’s ability and that provided bythis formation bonus—is 4.";
    RequirementsDescription: string = "At least 50 percent of the Heavy Battle Lance must be of Size 3 or higher, and there may be no Size 1 units in this formation. If this is a vehicle formation, there must be at least 2 matched pairs of Size 3 units.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (group.members.filter(x=>x.size===1).length>0){
            return false;
        }
        let result =true;
        result = result && (Math.ceil(group.members.length*.50)<=group.members.filter(x=>x.size>=3).length);
        return result;
    }
    
}
class AssaultLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Assault Lance";
    IdealRole: ASMULRole = {Id:108, Name: "Juggernaut", Image:"", SortOrder:108};
    BonusDescription: string = "At the beginning of play, the Assault Lance’s controlling player must choose either the Demoralizer or the Multi- Tasker SPAs (see pp. 93 and 98, respectively). When each turn of game play begins, the player may designate up to half the units in the Assault Lance (rounded down) to receive the chosen ability for the duration of the turn. Destroyed or withdrawn units do not count towards the current number of units in the formation. Note that while the chosen ability can switch its user from turn to turn, it cannot be changed to a different ability during the course of the same scenario.";
    RequirementsDescription: string = "At least 3 units in a basic Assault Lance must be of Size 3 or greater, and there can be no units of Size 1 in this formation type. All units in an Assault Lance must have a minimum (undamaged) Armor value of 5 points, and at least 75 percent of the units in this formation must possess a Medium-range attack value of 3 or more. An Assault Lance must contain at least one unit of the Juggernaut role, or 2 units of the Sniper role.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (this.CheckIdealRole(group, this.IdealRole.Name)){
            return true;
        }
        if (group.members.filter(x=>x.size===1).length>0){
            return false;
        }
        let result =true;
        result = result && (group.members.filter(x=>x.size>=3).length>=3);
        result = result && (group.members.filter(x=>x.armor<5).length===0);
        let medRange3OrGreaterCount = group.members.filter(x=>+x.damage.medium>=3).length;
        result = result && (Math.ceil(group.members.length*.75)<=medRange3OrGreaterCount);
        result = result && (this.RoleCount(group, "Juggernaut")>=1||this.RoleCount(group, "Sniper")>=2)
        
        return result;
    }
    
}
class FastAssaultLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Fast Assault Lance";
    BonusDescription: string = "At the beginning of play, the Fast Assault Lance’s controlling player must choose either the Demoralizer or the Multi- Tasker SPAs (see pp. 93 and 98, respectively). When each turn of game play begins, the player may designate up to half the units in the Fast Assault Lance (rounded down) to receive the chosen ability for the duration of the turn. Destroyed or withdrawn units do not count towards the current number of units in the formation. Note that while the chosen ability can switch its user from turn to turn, it cannot be changed to a different ability during the course of the same scenario. In addition to the bonus ability granted for the standard Assault lance, up to 2 units per Fast Assault Lance may also receive the Stand Aside SPA per turn (see p. 99). These two units need not be the same ones that are granted the Demoralizer or Multi- Tasker abilities, and it is possible for a Fast Assault Lance unit to thus receive two SPAs in the same turn as a result (i.e. Stand Aside and either Demoralizer or Multi-Tasker; depending on whichever one was chosen at the start of the scenario).";
    RequirementsDescription: string = "At least 3 units in a basic Fast Assault Lance must be of Size 3 or greater, and there can be no units of Size 1 in this formation type. All units in an Fast Assault Lance must have a minimum (undamaged) Armor value of 5 points, and at least 75 percent of the units in this formation must possess a Medium-range attack value of 3 or more. A Fast Assault Lance must contain at least one unit of the Juggernaut role, or 2 units of the Sniper role, all units must have a minimum ground-based Move of 10”, or possess the ability to jump (any distance), to qualify as a Fast Assault Lance.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (group.members.filter(x=>x.size===1).length>0){
            return false;
        }
        let result =true;
        result = result && (group.members.filter(x=>x.size>=3).length>=3);
        result = result && (group.members.filter(x=>x.armor<5).length===0);
        let medRange3OrGreaterCount = group.members.filter(x=>+x.damage.medium>=3).length;
        result = result && (Math.ceil(group.members.length*.75)<=medRange3OrGreaterCount);
        // faster than 10 or Jump capable

        result = result && (group.members.filter(x=>(x.move.filter(y=>y.type==="j").length>0)||(x.move.filter(y=>y.move>=10).length>0)).length===group.members.length);
        
        return result;
    }
    
}
class StrikerCavalryLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Striker/Cavalry Lance";
    IdealRole: ASMULRole = {Id:106, Name: "Striker", Image:"", SortOrder:106};
    BonusDescription: string = "75 percent of the units in a standard Striker/ Cavalry Lance receive the Speed Demon Special Pilot Ability (see p. 99).";
    RequirementsDescription: string = "All units in a Striker/Cavalry Lance must have a minimum ground Move of 10” or a jumping Move of 8”j. No units in a Striker/Cavalry Lance may be of Size 4 or above. At least 50 percent of the Striker/Cavalry Lance must be of the Striker or Skirmisher unit role";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (this.CheckIdealRole(group, this.IdealRole.Name)){
            return true;
        }
        if (group.members.filter(x=>x.size>=4).length>0){
            return false;
        }
        let result =true;
        
        // 50% striker or skirmisher
        result = result && (Math.ceil(group.members.length*.50)<=(this.RoleCount(group, "Striker")+this.RoleCount(group, "Skirmisher")));
        // faster than 10 or Jump capable

        result = result && (group.members.filter(x=>(x.move.filter(y=>y.type==="j"&&y.move>=8).length>0)||(x.move.filter(y=>y.move>=10).length>0)).length===group.members.length);
        
        return result;
    }
    
}
class LightStrikerCavalryLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Light Striker/Cavalry Lance";
    BonusDescription: string = "75 percent of the units in a standard Striker/ Cavalry Lance receive the Speed Demon Special Pilot Ability (see p. 99).";
    RequirementsDescription: string = "All units in a Light Striker/Cavalry Lance must have a minimum Move of 10”, with or without jumping capability. None of these units may be of Size 3 or higher, and at least 2 units in this formation must have a Long-range attack value higher than 0. At least 2 members of the Light Striker/Cavalry Lance must be of the Striker or Skirmisher unit roles.";


    IsValid(group: AlphaStrikeGroup): boolean {
        if (group.members.filter(x=>x.size>=4).length>0){
            return false;
        }
        let result =true;
        
        // 50% striker or skirmisher
        result = result && (Math.ceil(group.members.length*.50)<=(this.RoleCount(group, "Striker")+this.RoleCount(group, "Skirmisher")));
        // faster than 10 or Jump capable
        console.log("j",group.members.filter(x=>(x.move.filter(y=>y.type==="j"&&y.move>=8).length>0)));
        console.log("10",group.members.filter(x=>(x.move.filter(y=>y.move>=10).length>0)));


        result = result && (group.members.filter(x=>(x.move.filter(y=>y.type==="j"&&y.move>=8).length>0)||(x.move.filter(y=>y.move>=10).length>0)).length===group.members.length);
        
        return result;
    }
    
}
class HeavyStrikerCavalryLance extends FormationBonusBase implements IFormationBonus {
    Name: string = "Heavy Striker/Cavalry Lance";
    BonusDescription: string = "75 percent of the units in a standard Striker/ Cavalry Lance receive the Speed Demon Special Pilot Ability (see p. 99).";
    RequirementsDescription: string = "All units in a Heavy Striker/ Cavalry Lance must have a minimum Move of 8”, with or without jumping capability. At least 3 units in this formation type must be of Size 3, and none may be smaller than a Size 2. At least 1 unit in this formation type must have a Long-range attack value greater than 1 point. At least 2 units in the Heavy Striker/Cavalry Lance must be of the Striker or Skirmisher unit roles.";


    IsValid(group: AlphaStrikeGroup): boolean {

        if (group.members.filter(x=>x.size>=4).length>0){
            return false;
        }
        let result =true;
        
        // 50% striker or skirmisher
        result = result && (Math.ceil(group.members.length*.50)<=(this.RoleCount(group, "Striker")+this.RoleCount(group, "Skirmisher")));
        // faster than 10 or Jump capable
        console.log("j",group.members.filter(x=>(x.move.filter(y=>y.type==="j"&&y.move>=8).length>0)));
        console.log("10",group.members.filter(x=>(x.move.filter(y=>y.move>=10).length>0)));


        result = result && (group.members.filter(x=>(x.move.filter(y=>y.type==="j"&&y.move>=8).length>0)||(x.move.filter(y=>y.move>=10).length>0)).length===group.members.length);
        
        return result;
    }
    
}
export const formationBonuses: IFormationBonus[] = [
    new None(),
    new BattleLance(),
    new LightBattleLance(),
    new MediumBattleLance(),
    new HeavyBattleLance(),
    new AssaultLance(),
    new FastAssaultLance(),
    new StrikerCavalryLance(),
    new LightStrikerCavalryLance(),
    new HeavyStrikerCavalryLance(),





];