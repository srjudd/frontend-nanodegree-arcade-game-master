frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.

The height of the canvas is 606.

The y of the bug can be 65, 145, 225. If princess heights should be same until water, then height at upper grass should be 305, and at start should be 385.

Collision logic. Iterate through the enemies. Determine if a bug is in the same row as the princess. If the bug is in the same row as the princess, 
	see if its body overlaps the princess's body.
	Resources: The provided images were anlyzed using the Adobe Fireworks program.
		So, how to determine if the bug instance and the princess are in the same row?
	The two object bodies sit a few pixels different vertically in their backgrounds, but since both objects are constrained, through different methods, to rows, let's say they are in the same row if their y values differ by no more than 20 pixels.
	The princess picture is 13 pixels inside the background. Let's add 15 pixels from the x value (left edge) to get the left edge of the princess body, not counting her curls that stick out. Similarly, she is 75 pixels wide, but lets make that 71 pixels wide to not count the curls. So for collision purposes her left boundary will be her x value + 15, and her right boundary will be the her left boundary plus 71 (or x plus 86).
	The bug body is offset 1 pixel from the image's x value, and there is similar space on the right. The entire image is 98 px wide, so for collision I will estimate that its left edge is its x value +1 and its right edge is left edge plus 96, which is the same as the bug's x + 97.
	So, if the bug is to the left of the princess, there is no collision so long as the difference between the left edge of the bug image and the left edge of the princess image is greater than 97 . If the bug is to the right of the princess, there is no collision so long as the differene between the left edge of the bug body and the left edge of the princess is greater than 97 + 87 = 194. (this.x + 1) - (playerX + 15) < 194
Collision pseudocode
	The checkCollisions function will be called from the player update function, passing in the parameter of this.x and this.y from the player. It will update the collision variable's value when it returns a collision.
	Pseudocode: 
		function checkCollisions(playerX, playerY)
			for var b = 1; enemynum; b++;
				Is the bug in the same row as the player? (compare this.y with playerY for difference of less than 20)
					If yes, check the x values.
						Is the bug on the left of the princes? In other words, is princess left greater than bug left? 
							If Yes, check whether bug x + princess x is less than 97.
								If yes, 
								collision = 1;
								return



					If no, iterate to the next bug.

