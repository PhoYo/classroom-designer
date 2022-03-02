enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const menu = SpriteKind.create()
    export const chil_01 = SpriteKind.create()
    export const table = SpriteKind.create()
    export const speechBubble = SpriteKind.create()
    export const mood = SpriteKind.create()
    export const SelectionIcon = SpriteKind.create()
    export const title = SpriteKind.create()
    export const selector = SpriteKind.create()
}
/**
 * movement
 */
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(0, -1)
})
function createUI () {
    spr_menu = sprites.create(assets.image`myImage0`, SpriteKind.menu)
    spr_menu.z = 2000
    spr_roster = sprites.create(assets.image`myImage4`, SpriteKind.Player)
    spr_roster.setPosition(-1000, -1000)
    spr_roster.setPosition(0, 0)
    spr_speechBubble = sprites.create(assets.image`myImage`, SpriteKind.speechBubble)
    spr_speechBubble.z = 1000
    spr_mood = sprites.create(assets.image`myImage2`, SpriteKind.speechBubble)
    spr_mood.z = 1000
}
/**
 * Selection
 */
function deselect () {
    for (let value of grid.allSprites()) {
        if (value.kind() == SpriteKind.chil_01) {
            sprites.setDataBoolean(value, "highlighted", false)
            value.setImage(childrenNormal[sprites.readDataNumber(value, "childType")])
            target.setFlag(SpriteFlag.Invisible, false)
        }
    }
}
/**
 * buttons
 */
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(showtitle)) {
        if (rosterShown) {
        	
        } else {
            showMenu()
        }
    } else {
        animation.stopAnimation(animation.AnimationTypes.All, sprTitle)
        sprTitle.setPosition(-1000, -1000)
        showtitle = 0
        target.setFlag(SpriteFlag.Invisible, false)
    }
})
function selectChild (sprite: Sprite) {
    sprites.setDataBoolean(sprite, "highlighted", false)
    sprites.setDataBoolean(sprite, "selected", true)
    animation.runImageAnimation(
    sprite,
    childrenSelected[sprites.readDataNumber(sprite, "childType")],
    200,
    true
    )
}
/**
 * Roster
 */
function ShowChildrenInRoster () {
    ChildrenRosterList = []
    sprRosterNames = [
    textsprite.create(""),
    textsprite.create(""),
    textsprite.create(""),
    textsprite.create(""),
    textsprite.create("")
    ]
    childrenMoodList = []
    classRosterTitle = textsprite.create("Class of 2022")
    classRosterTitle.setPosition(target.x - 30, target.y - 55)
    classRosterTitle.z = 3000
    sprSelectionIcon = sprites.create(assets.image`myImage5`, SpriteKind.SelectionIcon)
    animation.runImageAnimation(
    sprSelectionIcon,
    assets.animation`myAnim1`,
    200,
    true
    )
    sprSelectionIcon.setPosition(target.x - 0, target.y - 35)
    sprSelectionIcon.z = 3000
    for (let index = 0; index <= Children.length - 1; index++) {
        ChildrenRosterList[index] = Children[index]
        sprRosterNames[index] = textsprite.create("")
        console.log(sprites.readDataString(Children[index], "name"))
        sprRosterNames[index].setText(sprites.readDataString(Children[index], "name"))
        sprRosterNames[index].setPosition(target.x - 10, target.y - 35 + 20 * index)
        sprRosterNames[index].setMaxFontHeight(6)
        sprRosterNames[index].z += 3000
        childrenMoodList[index] = returnMood(Children[index])
        childrenMoodList[index].setPosition(target.x - -54, target.y - 35 + 20 * index)
        childrenMoodList[index].z = 3000
        ChildrenRosterList[index].z = 3000
        ChildrenRosterList[index].setPosition(target.x - 60, target.y - 36 + 20 * index)
        ChildrenRosterList[index].z = 3000
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(showtitle)) {
        if (menuVisible || rosterShown) {
            if (rosterShown) {
                game.showLongText(sprites.readDataString(Children[RosterSelectionVar], "info"), DialogLayout.Bottom)
            }
        } else {
            for (let value of grid.getSprites(tiles.getTileLocation(currentXpos, currentYpos))) {
                if (value.kind() == SpriteKind.chil_01) {
                    selectChild(value)
                }
            }
            animation.runImageAnimation(
            target,
            assets.animation`myAnim`,
            100,
            false
            )
        }
    } else {
        grid.place(target, tiles.getTileLocation(currentXpos, currentYpos))
        tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
        animation.stopAnimation(animation.AnimationTypes.All, sprTitle)
        sprTitle.setPosition(-1000, -1000)
        target.setFlag(SpriteFlag.Invisible, false)
        showtitle = 0
        positionUI()
    }
})
function setMood (mySprite: Sprite) {
    tempGenderVar = randint(0, 1)
    sprites.setDataString(mySprite, "mood", "sad")
    if (tempGenderVar) {
        sprites.setDataString(mySprite, "gender", "male")
        sprites.setDataString(mySprite, "name", childrenBoysNames._pickRandom())
    } else {
        sprites.setDataString(mySprite, "gender", "female")
        sprites.setDataString(mySprite, "name", childrenGirlsNames._pickRandom())
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(-1, 0)
})
function createSpeechBubble (child: Sprite) {
    stillTalking = 1
    sprites.setDataBoolean(child, "talking", true)
    spr_speechBubble.setPosition(child.x, child.top + -8)
    spr_mood.setPosition(child.x, child.top + -9)
    if (sprites.readDataString(child, "mood") == "sad") {
        spr_mood.setImage(assets.image`myImage3`)
    } else if (sprites.readDataString(child, "mood") == "happy") {
        spr_mood.setImage(assets.image`myImage2`)
    } else {
    	
    }
    timer.after(3000, function () {
        spr_speechBubble.setPosition(500, 500)
        spr_mood.setPosition(500, 500)
        sprites.setDataBoolean(child, "talking", false)
        stillTalking = 0
    })
}
/**
 * Depth sorting
 */
function depthSorting () {
    target.z = target.bottom / 100
    for (let value of Children) {
        value.z = value.bottom / 100
    }
    for (let value2 of objectList) {
        value2.z = value2.bottom / 100
    }
}
function createToolbox () {
    toolboxMenu_sprites = [0, 1]
    toolboxMenuOptions = [
    sprites.create(assets.image`cursor1`, SpriteKind.table),
    sprites.create(assets.image`cursor0`, SpriteKind.table),
    sprites.create(assets.image`cursor2`, SpriteKind.table),
    sprites.create(assets.image`cursor3`, SpriteKind.table),
    sprites.create(assets.image`cursor4`, SpriteKind.Player),
    sprites.create(assets.image`cursor5`, SpriteKind.Player)
    ]
    for (let value7 of toolboxMenuOptions) {
        value7.setPosition(-1000, -1000)
    }
}
/**
 * Debug
 */
function showDebug () {
    debug_xPos = textsprite.create(convertToText(currentXpos), 15, 1)
    debug_yPos = textsprite.create(convertToText(currentYpos), 15, 1)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(1, 0)
})
/**
 * Constants
 */
function createChildren () {
    Children = [
    sprites.create(assets.image`villager3WalkFront1`, SpriteKind.chil_01),
    sprites.create(assets.image`villager3WalkFront0`, SpriteKind.chil_01),
    sprites.create(assets.image`villager3WalkFront8`, SpriteKind.chil_01),
    sprites.create(assets.image`villager3WalkFront3`, SpriteKind.chil_01),
    sprites.create(assets.image`villager3WalkFront4`, SpriteKind.chil_01)
    ]
    childrenNormal = [
    assets.image`villager3WalkFront1`,
    assets.image`villager3WalkFront0`,
    assets.image`villager3WalkFront8`,
    assets.image`villager3WalkFront3`,
    assets.image`villager3WalkFront4`
    ]
    childrenHighlighted = [
    assets.image`villager3WalkFront6`,
    assets.image`villager3WalkFront7`,
    assets.image`villager3WalkFront2`,
    assets.image`villager3WalkFront9`,
    assets.image`villager3WalkFront10`
    ]
    childrenSelected = [
    assets.animation`myAnim7`,
    assets.animation`myAnim8`,
    assets.animation`myAnim11`,
    assets.animation`myAnim9`,
    assets.animation`myAnim10`
    ]
    childrenGirlsNames = [
    "Emma",
    "Olivia",
    "Ava",
    "Isabella",
    "Sophia",
    "Mia",
    "Charlotte",
    "Amelia",
    "Abigail",
    "Elizabeth",
    "Scarlett",
    "Grace",
    "Chloe",
    "Mila"
    ]
    childrenBoysNames = [
    "Henry",
    "Matthew",
    "Daniel",
    "Michael",
    "Joseph",
    "Sebastian",
    "David",
    "Riley",
    "Owen",
    "Jack",
    "Aaron",
    "Charles",
    "Thomas",
    "Caleb"
    ]
    childrenInfo = [
    "child info 1",
    "child info 2",
    "child info 3",
    "child info 4",
    "child info 5",
    "child info 6",
    "child info 7"
    ]
    for (let index = 0; index <= Children.length - 1; index++) {
        tiles.placeOnRandomTile(Children[index], assets.tile`myTile`)
        tiles.setTileAt(Children[index].tilemapLocation(), assets.tile`myTile22`)
        sprites.setDataString(Children[index], "info", childrenInfo._pickRandom())
        sprites.setDataBoolean(Children[index], "talking", false)
        sprites.setDataNumber(Children[index], "xPos", grid.spriteCol(Children[index]))
        sprites.setDataNumber(Children[index], "yPos", grid.spriteRow(Children[index]))
        sprites.setDataNumber(Children[index], "childType", index)
        sprites.setDataBoolean(Children[index], "highlighted", false)
        sprites.setDataNumber(Children[index], "selected", 0)
        setMood(Children[index])
        EntityList.push(Children[index])
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(0, 1)
})
function highlightChild (child: Sprite) {
    child.setImage(childrenHighlighted[sprites.readDataNumber(child, "childType")])
    sprites.setDataBoolean(child, "highlighted", true)
    target.setFlag(SpriteFlag.Invisible, true)
}
function positionUI () {
    if (menuVisible) {
        spr_menu.setPosition(target.x + 60, target.y + 0)
    } else {
        spr_menu.setPosition(target.x + 100, target.y + 0)
    }
}
function drawToolMenuOptions () {
    if (menuVisible) {
        MenuIncrementValue = 0
        for (let yCount = 0; yCount <= toolboxMenuOptions.length - 1; yCount++) {
            toolboxMenuOptions[MenuIncrementValue].setPosition(target.x + 42 + 16, target.y - 40 + 24 * yCount)
            toolboxMenuOptions[MenuIncrementValue].z = 2001
            MenuIncrementValue += 1
        }
        spr_toolSelectionBox = sprites.create(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            1 . . . . . . . . . . . . . . . 
            `, SpriteKind.selector)
        spr_toolSelectionBox.setFlag(SpriteFlag.Invisible, false)
        spr_toolSelectionBox.setPosition(target.x + 38 + 16, target.y - 44)
        spr_toolSelectionBox.z = 3000
        animation.runImageAnimation(
        spr_toolSelectionBox,
        assets.animation`myAnim13`,
        200,
        true
        )
    } else {
        spr_toolSelectionBox.setFlag(SpriteFlag.Invisible, true)
        for (let value3 of toolboxMenuOptions) {
            value3.setPosition(target.x + 600, target.y - 36)
            value3.z = 2001
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(showtitle)) {
        if (!(rosterShown)) {
            rosterShown = 1
            spr_roster.z = 3000
            spr_roster.setPosition(target.x, target.y)
            ShowChildrenInRoster()
        } else {
            rosterShown = 0
            spr_roster.setPosition(-1000, -1000)
            for (let value4 of Children) {
                tiles.placeOnRandomTile(value4, assets.tile`myTile`)
                value4.setPosition(value4.x, value4.y + 8)
            }
            for (let value5 of childrenMoodList) {
                value5.setPosition(-1000, -1000)
            }
            for (let value6 of sprRosterNames) {
                value6.setPosition(-1000, -1000)
            }
            classRosterTitle.setPosition(-1000, -1000)
            sprSelectionIcon.setPosition(-1000, -1000)
        }
    }
})
function playerMovement (x: number, y: number) {
    if (!(showtitle)) {
        if (rosterShown && (RosterSelectionVar < 4 || RosterSelectionVar > 0)) {
            sprSelectionIcon.y += y * 20
            RosterSelectionVar += y
        } else if (menuVisible) {
        	
        } else {
            if (currentYpos <= 10 || currentYpos >= 4 || (currentXpos >= 9 || currentXpos <= 21)) {
                currentYpos += y
                currentXpos += x
                grid.place(target, tiles.getTileLocation(currentXpos, currentYpos))
                deselect()
                for (let value of grid.getSprites(tiles.getTileLocation(currentXpos, currentYpos))) {
                    if (value.kind() == SpriteKind.chil_01) {
                        highlightChild(value)
                    }
                }
                tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
                positionUI()
                if (Debug) {
                    debug_xPos.setPosition(target.x + 0, target.y + 10)
                    debug_yPos.setPosition(target.x + 10, target.y + 10)
                    debug_xPos.setText(convertToText(currentXpos))
                    debug_yPos.setText(convertToText(currentYpos))
                }
            }
        }
    }
}
function createTitle () {
    sprTitle = sprites.create(assets.image`myImage6`, SpriteKind.title)
    sprTitle.setPosition(target.x + 168, target.y + 40)
    sprTitle.z = 3000
    animation.runMovementAnimation(
    sprTitle,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
}
function showMenu () {
    if (menuVisible) {
        menuVisible = 0
        target.setFlag(SpriteFlag.Invisible, false)
        positionUI()
        drawToolMenuOptions()
    } else {
        currentSelectedTool = 0
        menuVisible = 1
        target.setFlag(SpriteFlag.Invisible, true)
        drawToolMenuOptions()
        positionUI()
    }
}
function returnMood (Sprite2: Sprite) {
    sprTempMood = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        1 . . . . . . . . . . . . . . . 
        `, SpriteKind.mood)
    if (sprites.readDataString(Sprite2, "mood") == "sad") {
        sprTempMood.setImage(assets.image`myImage3`)
    } else if (sprites.readDataString(Sprite2, "mood") == "happy") {
        sprTempMood.setImage(assets.image`myImage2`)
    } else {
    	
    }
    return sprTempMood
}
/**
 * Start
 */
let sprTempMood: Sprite = null
let currentSelectedTool = 0
let spr_toolSelectionBox: Sprite = null
let MenuIncrementValue = 0
let childrenInfo: string[] = []
let childrenHighlighted: Image[] = []
let debug_yPos: TextSprite = null
let debug_xPos: TextSprite = null
let toolboxMenuOptions: Sprite[] = []
let toolboxMenu_sprites: number[] = []
let childrenGirlsNames: string[] = []
let childrenBoysNames: string[] = []
let tempGenderVar = 0
let Children: Sprite[] = []
let sprSelectionIcon: Sprite = null
let classRosterTitle: TextSprite = null
let childrenMoodList: Sprite[] = []
let sprRosterNames: TextSprite[] = []
let ChildrenRosterList: Sprite[] = []
let childrenSelected: Image[][] = []
let sprTitle: Sprite = null
let childrenNormal: Image[] = []
let spr_mood: Sprite = null
let spr_speechBubble: Sprite = null
let spr_roster: Sprite = null
let spr_menu: Sprite = null
let target: Sprite = null
let RosterSelectionVar = 0
let rosterShown = 0
let objectList: Sprite[] = []
let EntityList: Sprite[] = []
let stillTalking = 0
let currentYpos = 0
let currentXpos = 0
let menuVisible = 0
let Debug = 0
let showtitle = 0
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level1`)
showtitle = 1
Debug = 0
menuVisible = 0
currentXpos = 15
currentYpos = 6
stillTalking = 0
EntityList = []
objectList = []
let checkTilesArounditem: number[] = []
rosterShown = 0
RosterSelectionVar = 0
let menuChoiceNumber = 0
let dir = 0
let tempCheckTileValue = [
0,
0,
0,
0
]
tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
target = sprites.create(assets.image`cursor`, SpriteKind.Player)
target.setFlag(SpriteFlag.Invisible, true)
createChildren()
createToolbox()
createTitle()
createUI()
if (Debug) {
    showDebug()
}
/**
 * Children tick
 */
game.onUpdateInterval(randint(1000, 3000), function () {
    if (!(rosterShown)) {
        dir = randint(0, 4)
        for (let value of Children) {
            if (!(sprites.readDataBoolean(value, "highlighted"))) {
                if (!(sprites.readDataBoolean(value, "selected"))) {
                    if (value.tileKindAt(TileDirection.Left, assets.tile`myTile`) && dir == 0) {
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile`)
                        grid.move(value, -1, 0)
                        sprites.changeDataNumberBy(value, "xPos", -1)
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile22`)
                    } else if (value.tileKindAt(TileDirection.Right, assets.tile`myTile`) && dir == 1) {
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile`)
                        grid.move(value, 1, 0)
                        sprites.changeDataNumberBy(value, "xPos", 1)
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile22`)
                    } else if (value.tileKindAt(TileDirection.Top, assets.tile`myTile`) && dir == 2) {
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile`)
                        grid.move(value, 0, -1)
                        sprites.changeDataNumberBy(value, "yPos", -1)
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile22`)
                    } else if (value.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) && dir == 3) {
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile`)
                        grid.move(value, 0, 1)
                        sprites.changeDataNumberBy(value, "yPos", 1)
                        tiles.setTileAt(value.tilemapLocation(), assets.tile`myTile22`)
                    } else {
                        if (!(stillTalking)) {
                            createSpeechBubble(value)
                        }
                    }
                }
            }
        }
    }
})
