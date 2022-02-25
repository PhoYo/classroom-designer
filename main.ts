namespace SpriteKind {
    export const menu = SpriteKind.create()
    export const chil_01 = SpriteKind.create()
    export const table = SpriteKind.create()
    export const speechBubble = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible) {
    	
    } else {
        if (currentYpos > 4) {
            currentYpos += -1
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    showMenu()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible) {
    	
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
    sprites.setDataString(mySprite, "mood", "sad")
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible) {
    	
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
    for (let value of objectList) {
        value.z = value.bottom / 100
    }
}
function showDebug () {
    debug_xPos = textsprite.create(convertToText(currentXpos), 15, 1)
    debug_yPos = textsprite.create(convertToText(currentYpos), 15, 1)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible) {
    	
    } else {
        if (currentXpos < 21) {
            currentXpos += 1
        }
    }
})
function moveChildren () {
	
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menuVisible) {
    	
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
        for (let yCount = 0; yCount <= 1; yCount++) {
            yValue = 24 * yCount
            for (let xCount = 0; xCount <= 1; xCount++) {
                toolboxMenuOptions[MenuIncrementValue].setPosition(target.x + 38 + 24 * xCount, target.y - 40 + 24 * yCount)
                toolboxMenuOptions[MenuIncrementValue].z = 2001
                MenuIncrementValue += 1
            }
        }
    } else {
        for (let value of toolboxMenuOptions) {
            value.setPosition(target.x + 600, target.y - 36)
            value.z = 2001
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Debug) {
        Debug = 0
    } else {
        Debug = 1
        console.log("show Debug")
        showDebug()
    }
})
function showMenu () {
    if (menuVisible) {
        drawToolMenuOptions()
        menuVisible = 0
        target.setImage(assets.image`cursor`)
    } else {
        drawToolMenuOptions()
        menuVisible = 1
        target.setImage(assets.image`empty`)
    }
}
let yValue = 0
let MenuIncrementValue = 0
let debug_yPos: TextSprite = null
let debug_xPos: TextSprite = null
let spr_mood: Sprite = null
let spr_speechBubble: Sprite = null
let target: Sprite = null
let toolboxMenuOptions: Sprite[] = []
let Children: Sprite[] = []
let objectList: Sprite[] = []
let stillTalking = 0
let currentYpos = 0
let currentXpos = 0
let menuVisible = 0
let Debug = 0
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level1`)
let dir = 0
Debug = 0
menuVisible = 0
currentXpos = 15
currentYpos = 6
stillTalking = 0
objectList = []
let spr_menu = sprites.create(assets.image`myImage0`, SpriteKind.menu)
spr_menu.z = 2000
Children = [
sprites.create(assets.image`villager3WalkFront1`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront0`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront2`, SpriteKind.chil_01),
sprites.create(assets.image`villager3WalkFront3`, SpriteKind.Player),
sprites.create(assets.image`villager3WalkFront4`, SpriteKind.Player)
]
let spr_table = sprites.create(assets.image`table`, SpriteKind.table)
let toolboxMenu_sprites = [0, 1]
toolboxMenuOptions = [
sprites.create(assets.image`cursor1`, SpriteKind.table),
sprites.create(assets.image`cursor0`, SpriteKind.table),
sprites.create(assets.image`cursor2`, SpriteKind.table),
sprites.create(assets.image`cursor3`, SpriteKind.table)
]
tiles.placeOnRandomTile(spr_table, assets.tile`myTile`)
objectList.push(spr_table)
spr_table.setPosition(spr_table.x, spr_table.y + 14)
for (let value of Children) {
    tiles.placeOnRandomTile(value, assets.tile`myTile`)
    value.setPosition(value.x, value.y + 8)
    sprites.setDataBoolean(value, "talking", false)
    setMood(value)
}
target = sprites.create(assets.image`cursor`, SpriteKind.Player)
spr_speechBubble = sprites.create(assets.image`myImage`, SpriteKind.speechBubble)
spr_speechBubble.z = 1000
spr_mood = sprites.create(assets.image`myImage2`, SpriteKind.speechBubble)
spr_mood.z = 1000
game.onUpdate(function () {
    if (menuVisible) {
        spr_menu.setPosition(target.x + 50, target.y + -4)
    } else {
        tiles.placeOnTile(target, tiles.getTileLocation(currentXpos, currentYpos))
        spr_menu.setPosition(target.x + 100, target.y)
        tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
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
    for (let value of Children) {
        if (!(sprites.readDataBoolean(value, "talking"))) {
            dir = randint(0, 4)
            if (value.tileKindAt(TileDirection.Left, assets.tile`myTile`) && dir == 0) {
                tiles.placeOnTile(value, value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
            } else if (value.tileKindAt(TileDirection.Right, assets.tile`myTile`) && dir == 1) {
                tiles.placeOnTile(value, value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
            } else if (value.tileKindAt(TileDirection.Top, assets.tile`myTile`) && dir == 2) {
                tiles.placeOnTile(value, value.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
            } else if (value.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) && dir == 3) {
                tiles.placeOnTile(value, value.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
            } else {
                if (!(stillTalking)) {
                    createSpeechBubble(value)
                }
            }
        }
    }
    depthSorting()
})
