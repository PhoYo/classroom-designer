namespace SpriteKind {
    export const menu = SpriteKind.create()
    export const chil_01 = SpriteKind.create()
    export const table = SpriteKind.create()
    export const speechBubble = SpriteKind.create()
    export const mood = SpriteKind.create()
    export const SelectionIcon = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible || rosterShown) {
        if (rosterShown) {
            if (RosterSelectionVar > 0) {
                sprSelectionIcon.y += -20
                RosterSelectionVar += -1
            }
        }
    } else {
        if (currentYpos > 4) {
            currentYpos += -1
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (rosterShown) {
    	
    } else {
        showMenu()
    }
})
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
    if (menuVisible || rosterShown) {
        if (rosterShown) {
            game.showLongText(sprites.readDataString(Children[RosterSelectionVar], "info"), DialogLayout.Bottom)
        }
    } else {
        animation.runImageAnimation(
        target,
        assets.animation`myAnim`,
        100,
        false
        )
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
    if (menuVisible || rosterShown) {
    	
    } else {
        if (currentXpos > 9) {
            currentXpos += -1
        }
    }
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
function depthSorting () {
    target.z = target.bottom / 100
    for (let value of Children) {
        value.z = value.bottom / 100
    }
    for (let value2 of objectList) {
        value2.z = value2.bottom / 100
    }
}
function showDebug () {
    debug_xPos = textsprite.create(convertToText(currentXpos), 15, 1)
    debug_yPos = textsprite.create(convertToText(currentYpos), 15, 1)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible || rosterShown) {
    	
    } else {
        if (currentXpos < 21) {
            currentXpos += 1
        }
    }
})
function moveChildren () {
	
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible || rosterShown) {
        if (rosterShown) {
            if (RosterSelectionVar < 4) {
                sprSelectionIcon.y += 20
                RosterSelectionVar += 1
            }
        }
    } else {
        if (currentYpos < 10) {
            currentYpos += 1
        }
    }
})
function drawToolMenuOptions () {
    console.log(menuVisible)
    if (menuVisible) {
        MenuIncrementValue = 0
        for (let yCount = 0; yCount <= 2; yCount++) {
            yValue = 24 * yCount
            for (let xCount = 0; xCount <= 1; xCount++) {
                toolboxMenuOptions[MenuIncrementValue].setPosition(target.x + 39 + 24 * xCount, target.y - 40 + 24 * yCount)
                toolboxMenuOptions[MenuIncrementValue].z = 2001
                MenuIncrementValue += 1
            }
        }
    } else {
        for (let value3 of toolboxMenuOptions) {
            value3.setPosition(target.x + 600, target.y - 36)
            value3.z = 2001
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Debug) {
        console.log("show Debug")
        showDebug()
    } else {
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
function showMenu () {
    if (menuVisible) {
        menuVisible = 0
        target.setImage(assets.image`cursor`)
        drawToolMenuOptions()
    } else {
        menuVisible = 1
        target.setImage(assets.image`empty`)
        drawToolMenuOptions()
    }
}
function returnMood (Sprite2: Sprite) {
    sprTempMood = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.mood)
    if (sprites.readDataString(Sprite2, "mood") == "sad") {
        sprTempMood.setImage(assets.image`myImage3`)
    } else if (sprites.readDataString(Sprite2, "mood") == "happy") {
        sprTempMood.setImage(assets.image`myImage2`)
    } else {
    	
    }
    return sprTempMood
}
let dir = 0
let sprTempMood: Sprite = null
let yValue = 0
let MenuIncrementValue = 0
let debug_yPos: TextSprite = null
let debug_xPos: TextSprite = null
let tempGenderVar = 0
let classRosterTitle: TextSprite = null
let childrenMoodList: Sprite[] = []
let sprRosterNames: TextSprite[] = []
let ChildrenRosterList: Sprite[] = []
let sprSelectionIcon: Sprite = null
let spr_mood: Sprite = null
let spr_speechBubble: Sprite = null
let target: Sprite = null
let childrenBoysNames: string[] = []
let childrenGirlsNames: string[] = []
let toolboxMenuOptions: Sprite[] = []
let Children: Sprite[] = []
let spr_roster: Sprite = null
let RosterSelectionVar = 0
let rosterShown = 0
let objectList: Sprite[] = []
let stillTalking = 0
let currentYpos = 0
let currentXpos = 0
let menuVisible = 0
let Debug = 0
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level1`)
Debug = 0
menuVisible = 0
currentXpos = 15
currentYpos = 6
stillTalking = 0
objectList = []
rosterShown = 0
RosterSelectionVar = 0
spr_roster = sprites.create(assets.image`myImage4`, SpriteKind.Player)
spr_roster.setPosition(-1000, -1000)
spr_roster.setPosition(0, 0)
let spr_menu = sprites.create(assets.image`myImage0`, SpriteKind.menu)
spr_menu.z = 2000
Children = [
sprites.create(assets.image`villager3WalkFront1`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront0`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront2`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront3`, SpriteKind.Player),
sprites.create(assets.image`villager3WalkFront4`, SpriteKind.Player)
]
let spr_table = sprites.create(assets.image`cursor1`, SpriteKind.table)
let toolboxMenu_sprites = [0, 1]
toolboxMenuOptions = [
sprites.create(assets.image`cursor1`, SpriteKind.table),
sprites.create(assets.image`cursor0`, SpriteKind.table),
sprites.create(assets.image`cursor2`, SpriteKind.table),
sprites.create(assets.image`cursor3`, SpriteKind.table),
sprites.create(assets.image`cursor4`, SpriteKind.Player),
sprites.create(assets.image`cursor5`, SpriteKind.Player)
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
let childrenInfo = [
"child info 1",
"child info 2",
"child info 3",
"child info 4",
"child info 5",
"child info 6",
"child info 7"
]
for (let value7 of toolboxMenuOptions) {
    value7.setPosition(-1000, -1000)
}
tiles.placeOnRandomTile(spr_table, assets.tile`myTile`)
objectList.push(spr_table)
spr_table.setPosition(spr_table.x, spr_table.y + 14)
for (let value8 of Children) {
    tiles.placeOnRandomTile(value8, assets.tile`myTile`)
    value8.setPosition(value8.x, value8.y + 8)
    sprites.setDataString(value8, "info", childrenInfo._pickRandom())
    sprites.setDataBoolean(value8, "talking", false)
    setMood(value8)
}
target = sprites.create(assets.image`cursor`, SpriteKind.Player)
spr_speechBubble = sprites.create(assets.image`myImage`, SpriteKind.speechBubble)
spr_speechBubble.z = 1000
spr_mood = sprites.create(assets.image`myImage2`, SpriteKind.speechBubble)
spr_mood.z = 1000
game.onUpdate(function () {
    if (menuVisible || rosterShown) {
        spr_menu.setPosition(target.x + 50, target.y + -4)
    } else {
        tiles.placeOnTile(target, tiles.getTileLocation(currentXpos, currentYpos))
        spr_menu.setPosition(target.x + 100, target.y)
        tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
        depthSorting()
    }
    if (Debug) {
        debug_xPos.setPosition(target.x + 0, target.y + 10)
        debug_yPos.setPosition(target.x + 10, target.y + 10)
        debug_xPos.setText(convertToText(currentXpos))
        debug_yPos.setText(convertToText(currentYpos))
    }
    moveChildren()
})
game.onUpdateInterval(randint(1000, 3000), function () {
    if (!(rosterShown)) {
        for (let value9 of Children) {
            if (!(sprites.readDataBoolean(value9, "talking"))) {
                dir = randint(0, 4)
                if (value9.tileKindAt(TileDirection.Left, assets.tile`myTile`) && dir == 0) {
                    tiles.placeOnTile(value9, value9.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
                } else if (value9.tileKindAt(TileDirection.Right, assets.tile`myTile`) && dir == 1) {
                    tiles.placeOnTile(value9, value9.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
                } else if (value9.tileKindAt(TileDirection.Top, assets.tile`myTile`) && dir == 2) {
                    tiles.placeOnTile(value9, value9.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
                } else if (value9.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) && dir == 3) {
                    tiles.placeOnTile(value9, value9.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
                } else {
                    if (!(stillTalking)) {
                        createSpeechBubble(value9)
                    }
                }
            }
        }
    }
})
