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
    export const entity = SpriteKind.create()
    export const emptySelection = SpriteKind.create()
    export const tooltip = SpriteKind.create()
    export const object = SpriteKind.create()
    export const uiStar = SpriteKind.create()
}
function checkScores () {
    tableAmount = 0
    matchAmount = 0
    layoutAmount = 0
    averageAmount = 0
    for (let value of objectList) {
        if (sprites.readDataString(value, "name") == "desk") {
            tableAmount += 1
        } else if (sprites.readDataString(value, "name") == "Abacus") {
            for (let value2 of Children) {
                if (sprites.readDataString(value2, "info") == "I get confused:with numbers as they:are hard to visualise") {
                    matchAmount += 1
                }
            }
        } else if (sprites.readDataString(value, "name") == "teddy bear") {
            for (let value3 of Children) {
                if (sprites.readDataString(value3, "info") == "I get scared and feel:anxious in a:classroom environment") {
                    matchAmount += 1
                }
            }
        } else if (sprites.readDataString(value, "name") == "Meditating Carpet") {
            for (let value4 of Children) {
                if (sprites.readDataString(value4, "info") == "Teacher says I am:hyperactive and fidgety") {
                    matchAmount += 1
                }
            }
        } else if (sprites.readDataString(value, "name") == "Classroom computer") {
            for (let value5 of Children) {
                if (sprites.readDataString(value5, "info") == "I wish we could go:on the internet:in class") {
                    matchAmount += 1
                }
            }
        }
    }
    if (tableAmount > 5) {
        amountOffset = tableAmount - 5
        tableAmount = tableAmount - amountOffset
    }
    averageAmount += tableAmount
    averageAmount += layoutAmount
    averageAmount += matchAmount
    averageAmount = averageAmount / 3
    console.log(averageAmount)
}
// movement
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(0, -1)
})
function createUI () {
    spr_menu = sprites.create(assets.image`myImage0`, SpriteKind.menu)
    spr_menu.z = 2000
    spr_roster = sprites.create(assets.image`myImage4`, SpriteKind.Player)
    spr_roster.setPosition(-1000, -1000)
    spr_roster.setPosition(-1000, -1000)
    spr_speechBubble = sprites.create(assets.image`myImage`, SpriteKind.speechBubble)
    spr_speechBubble.z = 1000
    spr_speechBubble.setPosition(-1000, -1000)
    spr_mood = sprites.create(assets.image`myImage2`, SpriteKind.speechBubble)
    spr_mood.z = 1000
    spr_mood.setPosition(-1000, -1000)
}
// Selection
function deselect () {
    for (let value6 of grid.allSprites()) {
        if (value6.kind() == SpriteKind.chil_01) {
            sprites.setDataBoolean(value6, "highlighted", false)
            value6.setImage(childrenNormal[sprites.readDataNumber(value6, "childType")])
            target.setFlag(SpriteFlag.Invisible, false)
        }
    }
}
// buttons
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(showtitle) && !(OverviewScreen)) {
        if (rosterShown) {
        	
        } else {
            if (selectedEntity.kind() == SpriteKind.emptySelection) {
                showMenu()
                showTooltip(sprites.readDataString(toolboxMenuOptions[currentSelectedTool], "name"), 0, -34, 0)
                removeTooltips()
            } else {
                music.buzzer.play()
            }
        }
    } else {
    	
    }
})
function selectChild (sprite: Sprite) {
    selectedEntity = sprite
    sprites.setDataBoolean(sprite, "highlighted", false)
    sprites.setDataBoolean(sprite, "selected", true)
    sprite.setPosition(sprite.x, sprite.y - 4)
    sprite.z = 2000
    animation.runImageAnimation(
    sprite,
    childrenSelected[sprites.readDataNumber(sprite, "childType")],
    200,
    true
    )
}
function moveSelectedEntity () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(currentXpos, currentYpos), assets.tile`myTile`)) {
        sprites.setDataNumber(selectedEntity, "xPos", currentXpos)
        sprites.setDataNumber(selectedEntity, "xPos", currentYpos)
        sprites.setDataBoolean(selectedEntity, "selected", false)
        sprites.setDataBoolean(selectedEntity, "highlighted", true)
        animation.stopAnimation(animation.AnimationTypes.All, selectedEntity)
        grid.snap(selectedEntity)
        music.knock.play()
        scene.cameraShake(2, 100)
        if (!(selectedEntity.kind() == SpriteKind.emptySelection)) {
            tiles.setTileAt(tiles.getTileLocation(currentXpos, currentYpos), assets.tile`myTile22`)
        }
        selectedEntity = sprites.create(img`
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
            `, SpriteKind.emptySelection)
        depthSorting()
    } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(currentXpos, currentYpos), assets.tile`myTile22`)) {
        tiles.setTileAt(tiles.getTileLocation(currentXpos, currentYpos), assets.tile`myTile`)
    } else if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(currentXpos, currentYpos), assets.tile`myTile`))) {
        music.buzzer.play()
    }
}
// Roster
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
            } else if (menuVisible) {
                newTempTool = sprites.create(toolboxMenuOptions[currentSelectedTool].image, SpriteKind.entity)
                selectedEntity = newTempTool
                sprites.setDataString(newTempTool, "name", sprites.readDataString(toolboxMenuOptions[currentSelectedTool], "name"))
                objectList.push(newTempTool)
                if (sprites.readDataString(newTempTool, "name") == "Meditating Carpet") {
                    newTempTool.z = 1
                }
                if (selectedEntity.kind() != SpriteKind.emptySelection) {
                    grid.place(selectedEntity, tiles.getTileLocation(currentXpos, currentYpos))
                    selectedEntity.setPosition(selectedEntity.x, selectedEntity.y - 4)
                }
                showMenu()
            }
        } else {
            if (OverviewScreenTimerComplete) {
                game.reset()
            } else {
                for (let value22 of grid.getSprites(tiles.getTileLocation(currentXpos, currentYpos))) {
                    if (value22.kind() == SpriteKind.chil_01) {
                        if (selectedEntity.kind() == SpriteKind.emptySelection) {
                            selectChild(value22)
                        }
                    }
                }
                moveSelectedEntity()
                animation.runImageAnimation(
                target,
                assets.animation`myAnim`,
                100,
                false
                )
            }
        }
    } else if (showInfo) {
        music.baDing.play()
        showtitle = 0
        target.setFlag(SpriteFlag.Invisible, false)
        removeTooltips()
        info.startCountdown(20)
    } else if (OverviewScreen == 1) {
        console.log("blah")
    } else {
        grid.place(target, tiles.getTileLocation(currentXpos, currentYpos))
        tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
        animation.stopAnimation(animation.AnimationTypes.All, sprTitle)
        sprTitle.setPosition(-1000, -1000)
        positionUI()
        ShowInfo()
    }
})
function setMood (mySprite: Sprite) {
    tempGenderVar = randint(0, 1)
    sprites.setDataString(mySprite, "mood", "sad")
    if (tempGenderVar) {
        sprites.setDataString(mySprite, "gender", "male")
        sprites.setDataString(mySprite, "name", childrenBoysNames.removeAt(randint(0, childrenBoysNames.length - 1)))
    } else {
        sprites.setDataString(mySprite, "gender", "female")
        sprites.setDataString(mySprite, "name", childrenGirlsNames.removeAt(randint(0, childrenGirlsNames.length - 1)))
    }
    mySprite = sprites.create(img`
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
        `, SpriteKind.Player)
}
function showScoreOverview () {
    showTooltip("Layout", -42, -34, 1)
    showTooltip("Content", -45, -16, 1)
    showTooltip("Children", -48, 0, 1)
    showTooltip("Grade", -48, 30, 1)
    CreateStars(3, 10, 34)
    CreateStars(tableAmount, 10, 16)
    CreateStars(matchAmount, 10, 0)
    timer.after(3000, function () {
        showTooltip("Press A to continue", 0, 50, 1)
        OverviewScreenTimerComplete = 1
    })
    if (averageAmount < 2) {
        spr_grade = textsprite.create("C")
    } else if (averageAmount > 2 && averageAmount < 3) {
        spr_grade = textsprite.create("B")
    } else if (averageAmount > 3 && averageAmount < 5) {
        spr_grade = textsprite.create("A")
    } else if (averageAmount == 5) {
        spr_grade = textsprite.create("A+")
    }
    spr_grade.setMaxFontHeight(24)
    spr_grade.z = 3001
    spr_grade.setPosition(target.x + 14, target.y + 30)
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
    }
    timer.after(3000, function () {
        spr_speechBubble.setPosition(500, 500)
        spr_mood.setPosition(500, 500)
        sprites.setDataBoolean(child, "talking", false)
        stillTalking = 0
    })
}
info.onCountdownEnd(function () {
    music.magicWand.play()
    removeTooltips()
    checkScores()
    showMenu()
    showInfo = 0
    menuVisible = 0
    rosterShown = 0
    OverviewScreen = 1
    selectedEntity = sprites.create(img`
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
        `, SpriteKind.emptySelection)
    spr_OverviewScreen = sprites.create(assets.image`myImage10`, SpriteKind.menu)
    spr_OverviewScreen.setPosition(target.x - 0, target.y + -100)
    spr_OverviewScreen.z = 3000
    animation.runMovementAnimation(
    spr_OverviewScreen,
    animation.animationPresets(animation.easeDown),
    500,
    false
    )
    showScoreOverview()
})
// Depth sorting
function depthSorting () {
    target.z = target.bottom / 100
    for (let value32 of Children) {
        value32.z = value32.bottom / 100
    }
    for (let value222 of objectList) {
        value222.z = value222.bottom / 100
    }
}
function createToolbox () {
    toolboxMenu_sprites = [0, 1]
    toolboxMenuOptions = [
    sprites.create(assets.image`cursor8`, SpriteKind.object),
    sprites.create(assets.image`cursor0`, SpriteKind.object),
    sprites.create(assets.image`cursor2`, SpriteKind.object),
    sprites.create(assets.image`cursor3`, SpriteKind.object),
    sprites.create(assets.image`cursor9`, SpriteKind.object),
    sprites.create(assets.image`cursor11`, SpriteKind.object),
    sprites.create(assets.image`cursor10`, SpriteKind.object)
    ]
    toolboxMenuNames = [
    "desk",
    "teddy bear",
    "globe",
    "Meditating Carpet",
    "Abacus",
    "Classroom computer",
    "Bookshelf"
    ]
    for (let index2 = 0; index2 <= toolboxMenuOptions.length - 1; index2++) {
        toolboxMenuOptions[index2].setPosition(-1000, -1000)
        sprites.setDataString(toolboxMenuOptions[index2], "name", toolboxMenuNames[index2])
        sprites.setDataBoolean(toolboxMenuOptions[index2], "highlighted", false)
        sprites.setDataBoolean(toolboxMenuOptions[index2], "selected", false)
    }
}
function ShowInfo () {
    music.baDing.play()
    showTooltip("Listen to your students':needs and design a:classroom for them", 0, -30, 8)
    showTooltip("You have 180 seconds", 0, 0, 8)
    timer.after(3000, function () {
        showInfo = 1
        showTooltip("Press A to begin", 0, 30, 8)
    })
}
function showTooltip (text: string, xPosOffset: number, yPosOffset: number, lineSpacing: number) {
    if (selectedEntity.kind() == SpriteKind.emptySelection) {
        textStringArray = text.split(":")
        for (let index3 = 0; index3 <= textStringArray.length - 1; index3++) {
            tooltipText = textsprite.create(textStringArray[index3], 1, 15)
            tooltipText.setPosition(target.x + xPosOffset, target.y + yPosOffset + lineSpacing * index3)
            tooltipText.z = 3001
            tooltipText.setKind(SpriteKind.tooltip)
        }
    }
}
// Debug
function showDebug () {
    debug_xPos = textsprite.create(convertToText(currentXpos), 15, 1)
    debug_yPos = textsprite.create(convertToText(currentYpos), 15, 1)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(1, 0)
})
// Constants
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
    "Sometimes I have trouble:understanding my teacher:as English is not:my first language",
    "I have trouble:concentrating in class:which sometimes gets:me into trouble",
    "I get confused:with numbers as they:are hard to visualise",
    "When there is lots:of noise I struggle to:concentrate on reading",
    "I tend to make a lot:of mistakes:",
    "I get scared and feel:anxious in a:classroom environment",
    "I get very confused:when I am reading and:find it hard to relate:words to sounds",
    "Teacher says I am:hyperactive and fidgety",
    "I wish we could go:on the internet:in class",
    "Teacher says I:confuse the order:of letters in words."
    ]
    for (let index22 = 0; index22 <= Children.length - 1; index22++) {
        tiles.placeOnRandomTile(Children[index22], assets.tile`myTile`)
        tiles.setTileAt(Children[index22].tilemapLocation(), assets.tile`myTile22`)
        sprites.setDataString(Children[index22], "info", childrenInfo.removeAt(randint(0, childrenInfo.length - 1)))
        sprites.setDataBoolean(Children[index22], "talking", false)
        sprites.setDataNumber(Children[index22], "xPos", grid.spriteCol(Children[index22]))
        sprites.setDataNumber(Children[index22], "yPos", grid.spriteRow(Children[index22]))
        sprites.setDataNumber(Children[index22], "childType", index22)
        sprites.setDataBoolean(Children[index22], "highlighted", false)
        sprites.setDataNumber(Children[index22], "selected", 0)
        setMood(Children[index22])
        EntityList.push(Children[index22])
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    playerMovement(0, 1)
})
function CreateStars (amount: number, xPosOffset: number, yPosOffset: number) {
    starLayoutArray = []
    for (let index4 = 0; index4 <= 4; index4++) {
        if (index4 < amount) {
            starLayoutArray[index4] = sprites.create(assets.image`myImage11`, SpriteKind.uiStar)
        } else {
            starLayoutArray[index4] = sprites.create(assets.image`myImage12`, SpriteKind.uiStar)
        }
        starLayoutArray[index4].setPosition(target.x - xPosOffset + 15 * index4, target.y - yPosOffset)
        starLayoutArray[index4].z += 3001
        starLayoutArray[index4].changeScale(-0.2, ScaleAnchor.Middle)
    }
}
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
            toolboxMenuOptions[MenuIncrementValue].setPosition(target.x + 42 + 16, target.y - 40 + 32 * yCount)
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
        spr_toolSelectionBox.setPosition(target.x + 34 + 16, target.y - 48)
        spr_toolSelectionBox.z = 3000
        animation.runImageAnimation(
        spr_toolSelectionBox,
        assets.animation`myAnim13`,
        200,
        true
        )
    } else {
        spr_toolSelectionBox.setFlag(SpriteFlag.Invisible, true)
        for (let value322 of toolboxMenuOptions) {
            value322.setPosition(target.x + 600, target.y - 36)
            value322.z = 2001
        }
    }
}
function removeTooltips () {
    sprites.destroyAllSpritesOfKind(SpriteKind.tooltip)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(showtitle) && !(OverviewScreen)) {
        if (!(rosterShown)) {
            rosterShown = 1
            spr_roster.z = 3000
            spr_roster.setPosition(target.x, target.y)
            ShowChildrenInRoster()
        } else {
            rosterShown = 0
            spr_roster.setPosition(-1000, -1000)
            for (let value42 of Children) {
                tiles.placeOnRandomTile(value42, assets.tile`myTile`)
                value42.setPosition(value42.x, value42.y + 8)
            }
            for (let value52 of childrenMoodList) {
                value52.setPosition(-1000, -1000)
            }
            for (let value62 of sprRosterNames) {
                value62.setPosition(-1000, -1000)
            }
            classRosterTitle.setPosition(-1000, -1000)
            sprSelectionIcon.setPosition(-1000, -1000)
        }
    }
})
function playerMovement (x: number, y: number) {
    if (!(showtitle) && !(OverviewScreen)) {
        if (rosterShown && (RosterSelectionVar < 4 || RosterSelectionVar > 0)) {
            sprSelectionIcon.y += y * 20
            RosterSelectionVar += y
        } else if (menuVisible) {
            if (y < 0) {
                if (currentSelectedTool > 0) {
                    removeTooltips()
                    currentSelectedTool += -1
                    for (let index32 = 0; index32 <= toolboxMenuOptions.length - 1; index32++) {
                        toolboxMenuOptions[index32].setPosition(toolboxMenuOptions[index32].x, toolboxMenuOptions[index32].y + 32)
                    }
                    showTooltip(sprites.readDataString(toolboxMenuOptions[currentSelectedTool], "name"), 0, -34, 0)
                }
            } else if (y > 0) {
                if (currentSelectedTool < toolboxMenuOptions.length - 1) {
                    removeTooltips()
                    currentSelectedTool += 1
                    for (let index42 = 0; index42 <= toolboxMenuOptions.length - 1; index42++) {
                        toolboxMenuOptions[index42].setPosition(toolboxMenuOptions[index42].x, toolboxMenuOptions[index42].y - 32)
                    }
                    showTooltip(sprites.readDataString(toolboxMenuOptions[currentSelectedTool], "name"), 0, -34, 0)
                }
            }
        } else {
            if (currentXpos + x >= 9 && currentXpos + x <= 21 && (currentYpos + y <= 10 && currentYpos + y >= 4)) {
                console.log(x)
                currentXpos += x
                currentYpos += y
            }
            grid.place(target, tiles.getTileLocation(currentXpos, currentYpos))
            removeTooltips()
            deselect()
            highlightObject()
            tiles.centerCameraOnTile(tiles.getTileLocation(currentXpos, currentYpos))
            positionUI()
            if (selectedEntity.kind() != SpriteKind.emptySelection) {
                grid.place(selectedEntity, tiles.getTileLocation(currentXpos, currentYpos))
                selectedEntity.setPosition(selectedEntity.x, selectedEntity.y - 4)
            }
            if (Debug) {
                debug_xPos.setPosition(target.x + 0, target.y + 10)
                debug_yPos.setPosition(target.x + 10, target.y + 10)
                debug_xPos.setText(convertToText(currentXpos))
                debug_yPos.setText(convertToText(currentYpos))
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
function highlightObject () {
    if (!(showtitle)) {
        for (let value8 of grid.getSprites(tiles.getTileLocation(currentXpos, currentYpos))) {
            if (value8.kind() == SpriteKind.chil_01) {
                highlightChild(value8)
                showTooltip(sprites.readDataString(value8, "name"), 0, -14, 0)
                showTooltip(sprites.readDataString(value8, "info"), 1, 30, 8)
            }
        }
    }
}
let dir = 0
let sprTempMood: Sprite = null
let spr_toolSelectionBox: Sprite = null
let MenuIncrementValue = 0
let starLayoutArray: Sprite[] = []
let childrenInfo: string[] = []
let childrenHighlighted: Image[] = []
let debug_yPos: TextSprite = null
let debug_xPos: TextSprite = null
let textStringArray: string[] = []
let toolboxMenuNames: string[] = []
let toolboxMenu_sprites: number[] = []
let spr_OverviewScreen: Sprite = null
let spr_grade: TextSprite = null
let mySprite: Sprite = null
let childrenGirlsNames: string[] = []
let childrenBoysNames: string[] = []
let tempGenderVar = 0
let sprTitle: Sprite = null
let newTempTool: Sprite = null
let sprSelectionIcon: Sprite = null
let classRosterTitle: TextSprite = null
let childrenMoodList: Sprite[] = []
let sprRosterNames: TextSprite[] = []
let ChildrenRosterList: Sprite[] = []
let childrenSelected: Image[][] = []
let currentSelectedTool = 0
let toolboxMenuOptions: Sprite[] = []
let childrenNormal: Image[] = []
let spr_mood: Sprite = null
let spr_speechBubble: Sprite = null
let spr_roster: Sprite = null
let spr_menu: Sprite = null
let amountOffset = 0
let Children: Sprite[] = []
let averageAmount = 0
let layoutAmount = 0
let matchAmount = 0
let tableAmount = 0
let target: Sprite = null
let selectedEntity: Sprite = null
let tooltipText: TextSprite = null
let RosterSelectionVar = 0
let rosterShown = 0
let objectList: Sprite[] = []
let EntityList: Sprite[] = []
let OverviewScreen = 0
let stillTalking = 0
let currentYpos = 0
let currentXpos = 0
let menuVisible = 0
let showInfo = 0
let Debug = 0
let showtitle = 0
let OverviewScreenTimerComplete = 0
let checkTilesArounditem: number[] = []
let menuChoiceNumber = 0
OverviewScreenTimerComplete = 0
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level1`)
showtitle = 1
Debug = 0
showInfo = 0
menuVisible = 0
currentXpos = 15
currentYpos = 6
stillTalking = 0
OverviewScreen = 0
EntityList = []
objectList = []
rosterShown = 0
RosterSelectionVar = 0
tooltipText = textsprite.create("", 1, 15)
let randomChild = sprites.create(img`
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
    `, SpriteKind.Player)
let tempCheckTileValue = [
0,
0,
0,
0
]
selectedEntity = sprites.create(img`
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
    `, SpriteKind.emptySelection)
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
// Children tick
game.onUpdateInterval(randint(200, 500), function () {
    if (!(rosterShown)) {
        dir = randint(0, 3)
        randomChild = Children._pickRandom()
        if (!(sprites.readDataBoolean(randomChild, "highlighted"))) {
            if (!(sprites.readDataBoolean(randomChild, "selected"))) {
                if (randomChild.tileKindAt(TileDirection.Left, assets.tile`myTile`) && dir == 0) {
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile`)
                    grid.move(randomChild, -1, 0)
                    sprites.changeDataNumberBy(randomChild, "xPos", -1)
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile22`)
                    if (!(menuVisible) && !(OverviewScreen)) {
                        highlightObject()
                    }
                } else if (randomChild.tileKindAt(TileDirection.Right, assets.tile`myTile`) && dir == 1) {
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile`)
                    grid.move(randomChild, 1, 0)
                    sprites.changeDataNumberBy(randomChild, "xPos", 1)
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile22`)
                    if (!(menuVisible) && !(OverviewScreen)) {
                        highlightObject()
                    }
                } else if (randomChild.tileKindAt(TileDirection.Top, assets.tile`myTile`) && dir == 2) {
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile`)
                    grid.move(randomChild, 0, -1)
                    sprites.changeDataNumberBy(randomChild, "yPos", -1)
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile22`)
                    if (!(menuVisible) && !(OverviewScreen)) {
                        highlightObject()
                    }
                } else if (randomChild.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) && dir == 3) {
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile`)
                    grid.move(randomChild, 0, 1)
                    sprites.changeDataNumberBy(randomChild, "yPos", 1)
                    tiles.setTileAt(randomChild.tilemapLocation(), assets.tile`myTile22`)
                    if (!(menuVisible) && !(OverviewScreen)) {
                        highlightObject()
                    }
                }
            }
        }
    }
})
