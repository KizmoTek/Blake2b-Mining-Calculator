var animalList = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Sheep"]
var elementList = ["Metal", "Water", "Wood", "Fire", "Earth"]

const yearInput = document.getElementById("yearInput")
const yearResult = document.querySelector("#yearResult")
const metalResult = document.querySelector("#metalResult")
const resultBackground = document.querySelector(".ResultImage")
const zodiacInfo = document.querySelector("#zodiacInfoText")
const elementInfo = document.querySelector("#elementInfoText")

const randomYear = [1950, 2000, 2019]
const randomizer = Math.floor(Math.random() * (2019 - 1600 + 1)) + 1600
yearInput.value = randomizer

var currElement = ""

function liveUpdate() {
    yearInput.value = splitInput(yearInput.value)
    let tempYear
    tempYear = zodiacYear(yearInput.value)
    
    let tempElement
    tempElement = elementYear(yearInput.value)
    
    if (tempElement == 0) {
        metalResult.innerHTML = elementList[0]
        metalResult.style.color = "gray"
        resultBackground.style.backgroundColor = "gray"
        resultBackground.style.borderColor = "gray"
    } else if (tempElement == 1) {
        metalResult.innerHTML = elementList[1]
        metalResult.style.color = "#0045ad"
        resultBackground.style.backgroundColor = "#0045ad"
        resultBackground.style.borderColor = "#0045ad"
    } else if (tempElement == 2) {
        metalResult.innerHTML = elementList[2]
        metalResult.style.color = "rgb(99, 50, 0)"
        resultBackground.style.backgroundColor = "rgb(99, 50, 0, .95)"
        resultBackground.style.borderColor = "rgb(99, 50, 0, .8)"
    } else if (tempElement == 3) {
        metalResult.innerHTML = elementList[3]
        metalResult.style.color = "red"
        resultBackground.style.backgroundColor = "red"
        resultBackground.style.borderColor = "red"
    } else if (tempElement == 4) {
        metalResult.innerHTML = elementList[4]
        metalResult.style.color = "green"
        resultBackground.style.backgroundColor = "green"
        resultBackground.style.borderColor = "green"
    }
    
    
    if (tempYear == 0) {
        yearResult.innerHTML = animalList[0]
        document.getElementById('zodiacImage').src="Zodiacimages/Monkey.png"
        zodiacInfo.innerHTML = "Monkey is the ninth in the 12-year cycle of Chinese zodiac.<br><br>The monkey is a clever animal. It is usually compared to a smart person. During the Spring and Autumn Period (770 - 476 BC), the dignified Chinese official title of marquis was pronounced 'Hou', the same as the pronunciation of 'Monkey' in Chinese. The animal was thereby bestowed with an auspicious meaning.<br><br>Lucky Numbers: 1, 7, 8.<br>Lucky Colors: white, gold, blue.<br>Lucky Flowers: chrysanthemum, alliums.<br>Lucky Directions: north, northwest, west.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/monkey.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "People born in a Monkey year with the Metal element are smart, quick-witted, and confident but are also irritable and stubborn.They have entrepreneurial talents.<br><br>They are rather naughty in life, often playing tricks on others to capitalize on their cleverness, and they sometimes become the victims of their own cleverness.<br><br>Metal Monkeys are able to deal with issues with high proficiency and are, therefore, prone to success by making full use of good timing, geographical convenience, and good human relations.<br><br>The Destiny of Metal Monkeys: Alone"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Monkeys are smart, quick-witted, and fond of being in the limelight.<br>However, they often humiliate others with their haughty temper, which often results in them being hated by others, causing trouble in their careers.<br><br>As far as fortune is concerned, Water Monkeys are blessed with good fortune, so they often make unexpected gains in life. Water Monkeys are born to be leaders.<br>They are highly advised to manage their money rationally and not to get involved in gambling, or they will end up being as poor as a church mouse.<br><br>The Destiny of Water Monkeys: Lucky"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People for whom the Wood element and Monkey zodiac sign align for their birth year are lively and compassionate, and are always ready to help their friends. They have a strong sense of timing and responsibility, always trying their best to perfect their work.<br>However, they often need support and encouragement from friends due to sometimes having a lack of confidence.<br><br>Wood Monkeys are always as busy as bees, making a lot of money in life, just like the saying: 'no pain, no gain'.<br>They are highly advised to purchase some immovable properties after making their money instead of wasting it, and then expand their careers little by little.<br><br>The Destiny of Wood Monkeys: Rich"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People having the Fire element and Monkey sign for their birth year are ambitious and adventurous but irritable.<br><br>They have good relationships in society and are very popular among their friends/partners.<br><br>They have a head for business and think much of the ties of friendship.They go through ups and downs in life due to reaching for what is beyond their grasp.<br><br>Fire Monkeys are not content with their current lifestyles and tend to leave their hometowns to make their fortune. They have harmonious family lives and are prone to succeed with the help of their wives.<br><br>The Destiny of Fire Monkeys: Ups and Downs"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People of the Earth element and a Monkey year are frank, optimistic, and fearless, often building up their own enterprises from nothing and seldom getting help from their siblings.<br><br>Earth Monkeys are rather lucky when it comes to finances, and the chances are that they will receive an unexpected fortune in life. However, they will soon lose it due to their poor management of financial issues, so they are recommended to learn a special skill early on in life, ensuring they live in comfort.<br><br>The Destiny of Earth Monkeys: Lucky"
        }
        
    } else if (tempYear == 1) {
        yearResult.innerHTML = animalList[1]
        document.getElementById('zodiacImage').src="Zodiacimages/Rooster.png"
        zodiacInfo.innerHTML = "Rooster is the tenth in the 12-year cycle of Chinese zodiac sign.<br><br>Rooster is almost the epitome of fidelity and punctuality. For ancestors who had no alarm clocks, the crowing was significant, as it could awaken people to get up and start to work. In Chinese culture, another symbolic meaning of chicken carries is exorcising evil spirits.<br><br>Lucky Numbers: 5, 7, 8.<br>Lucky Colors: gold, brown, brownish yellow, yellow.<br>Lucky Flowers: gladiola, impatiens, cockscomb.<br>Lucky Directions: west, southwest, northeast.<br><br>Information gathered from: <a href='https://www.travelchinaguide.com/intro/social_customs/zodiac/rooster.htm' target='none'>www.chinahighlights.com</a>"
        if (tempElement == 0) {
            elementInfo.innerHTML = "People of the Metal element and Rooster sign are able to distinguish right from wrong, having the clearest mindset. They are determined and brave enough to face all difficulties.<br><br>Metal Roosters have the most considerable power of independentcriticism among all of the 12 zodiac signs.They make a great fortune due to their perseverance and hard work in life, just as the old Chinese saying goes: 'no pain, no gain'.<br><br>The Destiny of Metal Roosters: Powerful"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "People born in a year of the Rooster with the Water element agreeing are smart and quick-witted, being able to find solutions quickly to the difficulties they encounter.<br><br>They are tenderhearted and compassionate, always indulge themselves in love, and positively affect the lives of the people they love. Although they are very proud by nature, they don't publicize their achievements everywhere.<br><br>The Destiny of Water Roosters: Colorful"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a Rooster year corresponding to the Wood element are fond of being surrounded by others. They are particularly good at playing jokes to relax a tense atmosphere, and they attach great importance to their families.<br>Wood Roosters are rather energetic and overconfident; however, they also have tender feelings and, therefore, they long to be loved by others.<br><br>They are rather lucky at making money and often lose money at sunrise only to gain it back again at sunset. They have one thing in common: to be unsteady both in work and with finances.<br><br>The Destiny of Wood Roosters: Lucky"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Rooster sign and Fire element overlap value personal loyalty very much, always keep their word, and have a strong sense of timekeeping and responsibility at work.<br>Fire Roosters are rather impatient in life, always feeling that there is something missing if they don't get things done.<br><br>Fire Roosters are career-oriented activists, resulting in them being prone to success at middle age. They should not be discouraged in pursuing their love but should be encouraged to succeed despite all of the difficulties ahead.<br><br>The Destiny of Fire Roosters: Busy"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in an Earth element and Rooster sign year are very lively and generous with the demeanor of a general.<br>They are fond of traveling to make new friends from all walks of life and also try their best to build up their reputation among friends, resulting in them being trusted and highly respected by others.<br><br>Earth Roosters are said to have bright prospects.<br>A series of fortuitous circumstances advance their careers and they are able to achieve great success with the help of magnates. However, Earth Roosters should be careful in life and should never be smug or complacent when achieving something.<br><br>The Destiny of Earth Roosters: Outstanding"
        }
        
    } else if (tempYear == 2) {
        yearResult.innerHTML = animalList[2]
        document.getElementById('zodiacImage').src="Zodiacimages/Dog.png"
        zodiacInfo.innerHTML = "Dog is the eleventh in the 12-year cycle of Chinese zodiac sign.<br><br>Dog is man's good friend who can understand the human's spirit and obey its master, whether he is wealthy or not. The Chinese regard it as an auspicious animal. If a dog happens to come to a house, it symbolizes the coming of fortune.<br><br>Lucky Numbers: 3, 4, 9.<br>Lucky Colors: green, red, purple.<br>Lucky Flowers: rose, oncidium, cymbidium orchids.<br>Lucky Directions: east, southeast, south.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/dog.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "People of the Dog zodiac sign with the Metal element are rather conservative in life. They are always cautious and ready to help others in life.<br><br>They do everything by themselves instead of relying on others due to their strong self-esteem. What’s more, they will never give up in life until their goals are reached.<br><br>The Destiny of Metal Dogs: Independent"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Dogs are good at thinking and planning far ahead, whole heartedly paving the way for their futures. They are also brave enough to face any difficulties throughout their lives.<br>They are rather self-centered in life and can sometimes seem selfish.<br><br>As far as fortune is concerned, Water Dogs are well-versed in dealing with financial issues, making full use of their money to pave the way for their futures. They have a knack for making money and will, therefore, have a steady income in life, even though they cannot make a great fortune.<br><br>The Destiny of Water Dogs: Easy"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a year when the Wood element coincides with the Dog sign are not only sincere and reliable but are also considerate and understanding in life, and they always communicate politely with others.<br><br>Wood Dogs always think of repaying those who have given them help and support, and are also very devoted to their careers.<br>No matter what difficulties they encounter in life, they will try their best to overcome them one by one. They are suited to jobs that require great patience and can fully commit to these.<br><br>The Destiny of Wood Dogs: Dedicated"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "Fire Dogs are prone to being influenced by their interpersonal relationships and should be very careful when dealing with someone they don't like.<br>They can accomplish the tasks entrusted to them by others on time. However, it's hard for them to make any further progress due to their wide interests. Therefore, they should focus on one thing at a time to perfect it before moving on to the next task.<br><br>People with the Fire element and Dog sign for their birth year are fascinated with pursuing their dreams, and are able to succeed through their own intelligence and hard work.<br><br>The Destiny of Fire Dogs: Successful"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in a Dog year corresponding with the Earth element are sensible and able to distinguish good from bad.<br>It may seem as if they are not good at dealing with people but Earth Dogs are very communicative.<br><br>Earth Dogs never do things by half due to their dedicated attitude toward lifeand always sticking things out.<br>They are always serious and responsible in work, resulting in a high chance of success.<br><br>The Destiny of Earth Dogs: Good"
        }
        
    } else if (tempYear == 3) {
        yearResult.innerHTML = animalList[3]
        document.getElementById('zodiacImage').src="Zodiacimages/Pig.png"
        zodiacInfo.innerHTML = "Pig is the twelfth in the 12-year cycle of Chinese zodiac sign.<br><br>Pig is not thought to be a smart animal in China. It likes sleeping and eating and becomes fat. Thus it usually features laziness and clumsiness. On the positive side, it behaves itself, has no plan to harm others, and can bring affluence to people. Consequently, it has been regarded as wealth.<br><br>Lucky Numbers: 2, 5, 8.<br>Lucky Colors: yellow, grey, brown, gold.<br>Lucky Flowers: hydrangea, pitcher plant, marguerite.<br>Lucky Directions: southeast, northeast.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/pig.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "People of the Metal element and Pig sign are broad-minded, amicable, and willing to help others. They value personal loyalty very much, they also remember others gratitude and try to repay it.<br>They are highly recommended to try their best to increase their income and decrease their expenditure, and it's better for them to get into the habit of keeping accounts each day.<br><br>Metal Pigs are not as lucky as others in terms of fortune. Their finances gradually dwindle as a result of their extravagance.<br>They always work with great eagerness, and will benefit from great success if they are thoughtful enough.<br><br>The Destiny of Metal Pigs: Bittersweet"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "People born in a year of the Pig with the Water element work earnestly and are rather subjective in life. They insist on doing things in their own way, even though they may face difficulties, and they never feel regretful of their failures.<br>Water Pigs don't have much need for money as they don't have an extravagant or wasteful lifestyle. However, the chances for them to make a great fortune in life are great.<br><br>They have double characters in life, being prone to the influence of others.<br><br>The Destiny of Water Pigs: Decisive"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a Pig year corresponding to the Wood element are good-natured, lovely, easygoing, and brave. They are able to face difficulties due to their great endurance.<br>They get along well with their friends and colleagues, although they can also be rather irritable and act hastily when they think of something.<br><br>Wood Pigs are very generous and spend money quickly as soon as they get it. They also spend without restraint even though they have limited funds as they believe that everything has a solution.<br>They are advised to start saving money for a rainy day, even though they don't have much money in the first place.<br><br>The Destiny of Wood Pigs: Extravagant"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Pig sign and the Fire element overlap are rather dependent on others in life, so they are suited to cooperative jobs, and are prone to being successful if they learn a professional skill.<br>They are always brimming with great ambition, being fond of setting up enterprises of their own, and they also get along well with their friends and partners in work.<br><br>As far as fortune is concerned, Fire Pigs are very good at managing financial issues, so they should make a great fortune in life because they never waste a cent.<br><br>The Destiny of Fire Pigs: Wealthy"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in an Earth element and Pig sign year are very communicative and popular among their communities. They are never late for work due to their strong sense of timekeeping.<br><br>They are born lucky in life and are well-versed in managing financial issues. They have a slim chance of making unexpected money and have to work very hard to earn money.<br>Earth Pigs are very rich at middle age due to their hard work in their earlier years. Therefore, they can expect to live comfortably during old age.<br><br>The Destiny of Earth Pigs: Lucky"
        }
        
    } else if (tempYear == 4) {
        yearResult.innerHTML = animalList[4]
        document.getElementById('zodiacImage').src="Zodiacimages/Rat.png"
        zodiacInfo.innerHTML = "Rat is the first in the 12-year cycle of Chinese zodiac.<br><br>Though people consider the rat not adorable, and it even makes its way into derogatory languages, it ranks first on the Chinese zodiac signs. It has characteristics of an animal with spirit, wit, alertness, delicacy, flexibility and vitality.<br><br>Lucky Numbers: 2, 3.<br>Lucky Colors: gold, blue, green.<br>Lucky Flowers: lily, African violet, lily of the valley.<br>Lucky Directions: southeast, northeast.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/rat.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Metal Rats have a strong sense of self-awarenessand an unbalanced state of affections. They are very sensitive to the world and, therefore, attach great importance to their subjective experiences.<br>On one hand, people of the Metal element and Rat sign are hot-tempered and jealous, and don't do things by halves. On the other hand, they are very close to their parents, kind to their siblings, and are very smart and talented.<br><br>Metal Rats love money, but are not as good at saving it as other Rats pertaining to the elements of Wood, Water, Fire, and Earth are. They will be more successful if they control their hot temper and possessive instinct.<br><br>The Destiny of Gold Rats: Trouble"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "People born in a year of the Rat with the Water element coinciding are shrewd and well-versed in the rules of strategy.<br><br>Water Rats show great wisdom in balancing power and strategy. However, they are rather conservative in their actions as they prefer to swim with the tide rather than against it, resulting in good luck in their life.<br>They also lose many friends due to their excessively shrewd nature.<br><br>The Destiny of Water Rats: Good Luck"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "Wood Rats have strong principles, and use strategies flexibly enough to reach their goals. They like to feel safe in life, however they are often haunted by a sense of anxiety, and that's why they work so hard each day.<br>They have a charming personality, and are ready to care for and help others. They are also well-versed in laws and regulations, follow traditional moral standards, and have a strong sense of teamwork, getting along well with others although they sometimes seem selfish.<br><br>People born in a Rat year corresponding to the Wood element are miserable in childhood but are well fed and well clothed at middle age.<br><br>The Destiny of Wood Rats: Bittersweet"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Rat sign and Fire element overlap are very energetic, and are brave enough to face any difficulty and danger.<br>Fire Rats are cordial and friendly to their friends but very strict with themselves. They have sharp tongues and, therefore, they can often offend people.<br>They usually keep quiet, however, they will say everything they know and say it without reserve when they have a chance to speak.<br><br>Fire Rats are extremely close to their parents and kind to their brothers and sisters, attaching tremendous importance to their family and being willing to work hard all their life for their family.<br><br>The Destiny of Fire Rats: Faithfulness"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in an Earth element and Rat sign year are amiable, honest, flexible, modest, and down-to-earth. They are very serious in work, and they always get help and support from others due to their good relationships.<br>Earth Rats have a strong sense of self-esteem , and are easily misunderstood by their new colleagues at first. However, they will become firm friends when the misunderstanding is cleared up.<br><br>Without careful attention, Earth Rats are destined to underachieve and neglect their families.<br><br>The Destiny of Earth Rats: Unfaithfulness"
        }
        
    } else if (tempYear == 5) {
        yearResult.innerHTML = animalList[5]
        document.getElementById('zodiacImage').src="Zodiacimages/Ox.png"
        zodiacInfo.innerHTML = "Ox is the second in the 12-year cycle of Chinese zodiac sign.<br><br>Oxen used to be capable farming tools in agricultural society, which attach to the symbol of diligence, persistence and honesty. People born in the Year of Ox are probably tardy in action, but industrious and cautious. Most of them are conservative and hold their faith firmly.<br><br>Lucky Numbers: 1, 9.<br>Lucky Colors: red, blue, purple.<br>Lucky Flowers: tulip, evergreen, peach blossom.<br>Lucky Directions: southeast, south and north.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/ox.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Ox sign people with the Metal element also corresponding to their birth year are always active and busy, and are also highly respected due to their good relationships with others.<br><br>They are rich and honorable from an early age, live steadily at middle age, and enjoy a comfortable life in old age.<br><br>The Destiny of Gold Oxes: Busy"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Oxes are realists with keen observational abilities, tenacious characters, and wild ambitions, and they can make full use of resources around them to reach their goals. They don't waste much time and energy on unimportant things due to their practical perspective on life, instead they attach more importance to their financial and social status.<br><br>They can achieve their goals in life due to their abilities and great resolution. However, they offend others often, resulting in a loss of many precious friends and partners. They are highly recommended to maintain good relationships with others and to make good use of them in order to succeed.<br><br>Destiny of Water Oxes: Successful"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a year when the Wood element coincides with the Ox sign are restless, never hesitate to do what is right, and are always ready to defend the weak and helpless. Therefore, they can look after their friends selflessly in times of trouble.<br><br>They never stop to offer flattery and, as a result, they always offend others due to their straightforward and upright character, which is a disadvantage.<br><br>Destiny of Wood Oxes: Arduous"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People with the Fire element and Ox sign for their birth year are shortsighted, selfish, narrow-minded, impersonal, practical, and always shy away from close friendships.<br><br>They work hard to learn professional skills at an early age so as to have gained some achievements by middle age. They benefit from having wisdom but are vulnerable to temptations from the outside world due to a lack of decision-making skills.<br>As far as finances are concerned, they can contrive to live on a small income and make both ends meet, and they sometimes make an unexpected financial gain in addition to their normal salaries.<br><br>The Destiny of Fire Oxes: Vulnerable"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People of the Earth element and an Ox year are honest and prudent with a strong sense of responsibility, and they attach great importance to the equitable distribution of benefits when cooperating with others. They never make any offhand promises or do anything beyond their abilities, however they keep every promise that they have made and try their best to succeed.<br><br>They have an accurate appraisal of themselves, both the advantages and disadvantages. They can manage their work efficiently and never shy away from difficulty, ensuring they will achieve great success with the help of their friends.<br><br>The Destiny of Earth Oxes: Faithful"
        }
        
    } else if (tempYear == 6) {
        yearResult.innerHTML = animalList[6]
        document.getElementById('zodiacImage').src="Zodiacimages/Tiger.png"
        zodiacInfo.innerHTML = "Tiger is the third in the 12-year cycle of Chinese zodiac sign.<br><br>Tigers, considered to be brave, cruel, forceful, stately and terrifying, are the symbol of power and lordliness. In ancient times, people usually compared emperors or grandees with the tiger. Court officials often said that 'accompanying the emperor is just like being at the side of a tiger'. There are also many legends about this animal.<br><br>Lucky Numbers: 1, 3, 4.<br>Lucky Colors: grey, blue, white, orange.<br>Lucky Flowers: cineraria, anthurium.<br>Lucky Directions: south, east, southeast.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/tiger.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Tiger sign people with the Metal element also corresponding to their birth year attach great importance to their quiet and harmonious family life.<br><br>They are fascinated with power and they will achieve great success in politics if they work hard enough.<br>Metal Tigers get along well with their colleagues and neighbors in life and, as a result, can have a smooth career due to the help and support received from colleagues.<br><br>Destiny of Metal Tigers: Successful"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Tigers have an innate ability to learn something new, and they are especially professional in the fields of art and handicrafts.<br>They have a strong sense of self-esteem and seldom accept advice from others. They only have a slim chance of failing in their careers, which often incurs envy from others.<br><br>Water Tigers will achieve more in their careers by getting help from their friends. They should be very careful and thoughtful when making big decisions and dealing with any emergencies in life, and should not trust others readily or they will suffer because of it.<br><br>Destiny of Water Tigers: Bittersweet"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a year when the Wood element coincides with the Tiger sign are cooperative and communicative in work, and they also like to work with others to achieve common goals.<br>Wood Tigers will actively undertake tasks that are beyond their abilities, resulting in frustration and failure. As a result, they are highly advised to pool the wisdom of the masses to avoid mistakes in work.<br><br>They can use their own judgment and make the right decision each time.<br>However, they usually only pay attention to the surface of an issue, and they seldom dig into its underlying principles, resulting in the loss of many opportunities.<br><br>Destiny of Wood Tigers: Reckless"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "Fire Tigers are very independent in life and never yield before difficulties or worldly issues. No one actually knows much about what they think due to their Bohemian lifestyle.<br><br>People with the Fire element and Tiger sign for their birth year are optimistic but weak when it comes to self-control, thinking that the best time is the present.<br>They take action with eagerness and vigor each time, accompanied by loopholes and mistakes, therefore they should think carefully before taking action.<br><br>Destiny of Fire Tigers: Moderate"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People of the Earth element and a Tiger year work with the utmost concentration and know themselves well. As a result, they can express their inner thoughts perfectly throughout life.<br><br>Earth Tigers only focus on one thing at a time and do not like to take things as they are due to their adventurous spirit. They always make others see them in a different light due to their excellent performance at work.<br>They are factual and realistic people with unwavering beliefs who only believe what they see and, as a result, they have the potential to seek the truth.<br><br>Destiny of Earth Tigers: Excellent"
        }
        
    } else if (tempYear == 7) {
        yearResult.innerHTML = animalList[7]
        document.getElementById('zodiacImage').src="Zodiacimages/Rabbit.png"
        zodiacInfo.innerHTML = "Rabbit is the fourth in the 12-year cycle of Chinese zodiac sign.<br><br>For Chinese people, the rabbit is a tame creature representing hope for a long time. It is tender and lovely. People born in the Year of the Rabbit are not aggressive but approachable. They have a decent, noble and elegant manner.<br><br>Lucky Numbers: 3, 4, 9.<br>Lucky Colors: red, blue, pink, purple.<br>Lucky Flowers: snapdragon, plantain lily, nerve plant.<br>Lucky Directions: east, southeast, south.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/rabbit.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Metal Rabbits are lively and enthusiastic so have lots of friends from all walks of life, and those who are impersonal and stubborn are rarely friends with them.<br><br>People of the Metal element and Rabbit sign are kindhearted and conservative. They don't like cutthroat competition with others. They also don't like to make friends with those who are competitive or eager for quick success and instant benefits.<br><br>Destiny of Gold Rabbits: Peaceful"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "People born in a year of the Rabbit with the Water element agreeing are gentle and amicable, and are able to adjust readily to different conditions, yet are easily influenced by others due to their weak mindset and principles.<br><br>They rely heavily on people they trust and often feel depressed once they lose their dependence. As a result, they should learn to be independent.<br>Water Rabbits are fond of indulging themselves with all their bad habits, therefore they are advised not to waste money on unnecessary social engagements but to save it for a rainy day instead.<br><br>Destiny of Water Rabbits:Bad"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a Rabbit year corresponding to the Wood element are clever, quick-witted, and good at making plans.<br>Wood Rabbits are prone to being selfish in life and attach great importance on an equitable distribution of everything. They would have a more harmonious family life and a smoother career if they could show more consideration for others.<br><br>They seem lively in appearance but at heart they are very shrewd and often argue with their friends over trivial things.<br><br>Destiny of Wood Rabbits: Vulnerable"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Rabbit sign and the Fire element overlap are broad-minded, smart, and flexible with unique views. They work earnestly and they were born to be leaders.<br><br>Not only do they know how to judge and use people but they also know how to train different talents and pool them together, making them good teachers in life.<br>Fire Rabbits should not panic in times of unexpected trouble, such as a lack of money, and are recommended to purchase immovable properties and items of a high value at the beginning of the year.<br><br>Destiny of Fire Rabbits: Leading"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in an Earth element and Rabbit sign year are very frank and straightforward, however they also give an impression of rudeness and stubbornness to others, so they should be slightly reserved.<br><br>They are very strict with themselves in work and are rather ambitious in their careers, therefore they always change from one job to another. They are very hardworking and always pay special attention to details, being willing to do something trivial but soon getting tired of it.<br><br>Destiny of Earth Rabbits: Capricious"
        }
        
    } else if (tempYear == 8) {
        yearResult.innerHTML = animalList[8]
        document.getElementById('zodiacImage').src="Zodiacimages/Dragon.png"
        zodiacInfo.innerHTML = "Dragon is the fifth in the 12-year cycle of Chinese zodiac sign.<br><br>The Dragon enjoys a very high reputation in Chinese culture. Chinese people regard themselves as descendents of the dragon. In ancient China, this imaginary creature was thought to speed across the sky with divine power. It is the token of authority, dignity, honor, success, luck, and capacity. Emperors entitled themselves exclusively as 'dragon'.<br><br>Lucky Numbers: 1, 7, 6.<br>Lucky Colors: gold, silver, hoary.<br>Lucky Flowers: bleeding heart vine, larkspur, hyacinth.<br>Lucky Directions: west, north, northwest.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/dragon.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Dragon sign people with the Metal element are natural and straightforward, and they often change their minds due to their continually changing emotions. They have always been unpredictable to others but they mean no harm.<br><br>They hope they will live a harmonious and peaceful family life.<br>The elders in their families are vulnerable to slight illnesses due to their poor health, therefore Metal Dragons should care for their elders and pay more attention to their health.<br><br>The Destiny of Metal Dragons: Arduou"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Those with the Dragon sign and Water element are farsighted with perseverance but have a lack of individuality, and they often swim with the tide and sail with every wind.<br>Water Dragons are very vigorous and resilient, paying great attention to every detail to ensure perfection, however they also get tired easily.<br><br>The Destiny of Water Dragons: Romantic"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People for whom the Wood element and Dragon zodiac sign align for their birth year are introverted and refrain from talking. They are not enthusiastic in dealing with people and therefore don't have many close friends in life.<br><br>Although lacking many good interpersonal relationships, Wood Dragons are rather notable among their peers due to their excellent handling of matters, although they don't like to be in the limelight.<br>If Wood Dragons are recognized by their supervisors, they shine like stars due to their devotion to work without reservation.<br><br>The Destiny of Wood Dragons:Shiny"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "Not all Fire Dragons are very smart but most of them are able to do the right thing at the correct time by making full use of opportunities. Therefore, they are prone to being successful in both their careers and home lives.<br>They also give an impression of sailing with every wind as they pay little attention to matters of principle, although they are very capable of adapting themselves quickly to changing conditions.<br><br>They adore Mars and the color red. Summer is their favorite season and their mascot is a phoenix.<br><br>The Destiny of Fire Dragons: Lucky"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People of the Earth element and a Dragon year are very smart, ambitious, and hardworking, doing everything in life positively. Earth Dragons have loving hearts without any trace of priggish behavior, and they are inclined to become philanthropists.<br><br>They will definitely make great achievements if they continue to work hard, however they have a tendency to do things by halves.<br><br>The Destiny of Earth Dragons: Lucky"
        }
        
    } else if (tempYear == 9) {
        yearResult.innerHTML = animalList[9]
        document.getElementById('zodiacImage').src="Zodiacimages/Snake.png"
        zodiacInfo.innerHTML = "Snake is the sixth in the 12-year cycle of Chinese zodiac sign.<br><br>Snake carries the meanings of malevolence, cattiness and mystery, as well as acumen and divination. In some places, people believe that a Snake found in their court can bring delight. However, in most cases, this animal is considered evil, which scares people from the bottom of the heart.<br><br>Lucky Numbers: 2, 8, 9.<br>Lucky Colors: red, light yellow, black.<br>Lucky Flowers: orchid, cactus.<br>Lucky Directions: northeast, southwest, south.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/snake.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "People of the Metal element and Snake sign have self-respect, are determined and courageous. They are born to be leaders, being surrounded by lots of followers from all walks of life.<br><br>Metal Snakes are so confident that they give an impression of slight arrogance to others. It is not easy to tell whether they're being arrogant or not from their eyes and gait.<br>Most of them have a majestic appearance with thick curled hair, and are elegant in both sitting and standing positions.<br><br>The Destiny of Gold Snakes: Successful"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "People born in a year of the Snake with the Water element are creative, clever, and lively but sentimental.<br>They know how to cherish each opportunity and should be able to develop in business due to their adventurous characters. They will live steady lives when they become middle-aged after going through some ups and downs.<br><br>Young Water Snakes always change their minds. Some leave their hometowns for development at an early age and they have to build up from nothing due to their poor family backgrounds.<br><br>The Destiny of Water Snakes: Ups and Downs"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "Wood Snakes have a gift for appreciating the arts and are brimming with great creativity. They also have refined taste and know how to distinguish good works of art from bad ones.<br>They are fascinated with collecting delicate antiques and fine musical instruments, and know how to take care of them. Wood Snakes always return items that they have borrowed from others.<br><br>People born in a Snake year corresponding to the Wood element attach great importance to orderliness, and like to live in an orderly and well-decorated environment.<br><br>The Destiny of Wood Snakes: Graceful"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Snake sign and Fire element overlap have wisdom and insight, being able to think faster and see more clearly than others. They are also very communicative.<br>They know how to fully express their feelings in tales, although they seldom tell any.<br><br>They are very active and fond of the limelight, and are born to be performers and dancers.<br>Fire Snakes should not be too adventurous in life, instead they should take the surest way to do things in order to achieve more success.<br><br>The Destiny of Fire Snakes: Excellent"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born with an Earth element and Snake sign know how to control their sentiments with calm reasoning, but their romances are not very smooth and it's very likely for them to be left without love. They can recover quickly, however, due to their calm reasoning.<br><br>Earth Snakes don't like to be controlled by other people, therefore they should not be asked their whereabouts when they have been absent. They have lots of opportunities to earn money, however it's very hard for them to grasp them.<br><br>The Destiny of Earth Snakes: Bad"
        }
        
    } else if (tempYear == 10) {
        yearResult.innerHTML = animalList[10]
        document.getElementById('zodiacImage').src="Zodiacimages/Horse.png"
        zodiacInfo.innerHTML = "Horse is the seventh in the 12-year cycle of Chinese zodiac sign.<br><br>The Five Elements of Horse is Fire (Huo), which symbolizes enthusiasm and energy. The animal gives people an impression of independence and integrity. Its spirit is recognized to be the Chinese people's ethos - making unremitting efforts to improve themselves with passion and diligence.<br><br>Lucky Numbers: 2, 3, 7.<br>Lucky Colors: brown, yellow, purple.<br>Lucky Flowers: calla lily, jasmine, marigold.<br>Lucky Directions: northeast, southwest and northwest.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/horse.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "People of the Metal element and Horse sign are kind, straightforward, and ready to help others. They are very popular among their friends, although often offend others without meaning to due it.<br>Generally speaking, they get along well with young people.<br><br>Metal Horses like to have friends but their friends must be willing to put up with them.<br><br>The Destiny of Gold Horses: Unstable"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Horses are amicable and always ready to help others. In addition, it's very easy for them to make people feel more confident and pleased due to their easygoing characters and sincere affection.<br><br>People born in a year of the Horse with the Water element agreeing can sacrifice their interests for others. They are irritable and sentimental in life but their friends still show them the utmost solicitude.<br><br>The Destiny of Water Horses: Lucky"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People born in a Horse year corresponding to the Wood element have an abundant imagination. They are greatly admired due to their insightful analyses on issues and they often read the minds of others.<br><br>Wood Horses are born leaders and decision-makers, and they leave their colleagues with no reason to complain due to their correct and prudent decisions in work.<br><br>The Destiny of Wood Horses: Smooth"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People for whom the Horse sign and Fire element overlap are smart, charismatic, lively, overflowing with enthusiasm, and have the potential to lead the way concerning fashion trends.<br>Fire Horses have an unyielding character and they rarely take advice from others due to their stubborn characters.<br><br>Even though they may face great difficulties or be under great pressure, they will do their best to solve the issues with the help and support of their colleagues and bosses.<br><br>The Destiny of Fire Horses: Charismatic"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People born in an Earth element and Horse sign year are optimistic, kindhearted, righteous, and ready to help their friends, therefore they have a lot of friends in work.<br><br>They have a strong sense of responsibility and are brave enough to take action so they are often recognized by their bosses. They are surrounded by love although they sometimes make mistakes due to their irritable characters.<br><br>The Destiny of Earth Horses: Ordinary"
        }
        
    } else if (tempYear == 11) {
        yearResult.innerHTML = animalList[11]
        document.getElementById('zodiacImage').src="Zodiacimages/Sheep.png"
        zodiacInfo.innerHTML = "Sheep is the eighth in the 12-year cycle of Chinese zodiac.<br><br>Sheep (goat, or ram) is among the animals that people like most. It is gentle and calm. Since ancient times, people have learned to use its fleece to make writing brushes and fur to keep warm. The white cute creature often reminds people of beautiful things.<br><br>Lucky Numbers: 3, 4, 9.<br>Lucky Colors: green, red, purple.<br>Lucky Flowers: carnation, primrose, Alice flower.<br>Lucky Directions: east, southeast, south.<br><br>Information gathered from: <a href='https://www.chinahighlights.com/travelguide/chinese-zodiac/goat.htm' target='none'>www.chinahighlights.com</a>"
        
        if (tempElement == 0) {
            elementInfo.innerHTML = "Sheep sign people with the Metal element are ambitious and kindhearted with a strong sense of responsibility in work. They prefer doing things little by little and are able to set up their own careers, placing an emphasis on principles and faith.<br>Sometimes, they are so stubborn that it's hard for them to accommodate themselves to circumstances; therefore, they should learn professional job skills in order to achieve success.<br><br>As for their tendency with luck, fortune suddenly finds its way to them and they make more money each year.However, to some extent, they also suffer unexpected personal financial losses as their money increases.<br><br>The Destiny of Metal Sheep: Rough"
        } else if (tempElement == 1) {
            elementInfo.innerHTML = "Water Sheep are amicable and brimming with a strong sense of responsibility, however they are not fond of the limelight.<br>They are able to sacrifice their own interests for others, making them very popular among their friends. It's inevitable for them to suffer losses because they are so enthusiastic when helping their friends.<br><br>In terms of their careers, Water Sheep are suited to working in the fields of technology and academia. They live a miserable life at an early age, a steady life at middle age, and a comfortable life in old age.<br><br>The Destiny of Water Sheep: Fluctuant"
        } else if (tempElement == 2) {
            elementInfo.innerHTML = "People for whom the Wood element and Sheep zodiac sign align for their birth year are amicable, gentle, compassionate, and ready to help others. They get along with their friends and colleagues in life.<br><br>They have to do everything themselves because they cannot get help from their family members.<br><br>The Destiny of Wood Sheep: Alone"
        } else if (tempElement == 3) {
            elementInfo.innerHTML = "People having the Fire element and Sheep sign for their birth year are amicable, frank, and honest, always making everything clean and tidy, and are seldom disliked by others.<br>They are always ready to help their friends, disregarding their own personal gains or losses, so they are very popular. However, they are too sentimental to enter into a business partnership with others.<br><br>They are often troubled by trivial things in life and, as a result, need an independent partner to take care of them.<br>Fire Sheep are rather miserable at an early age but live steadily and comfortably at middle age due to their hard work.<br><br>The Destiny of Fire Sheep: Bad"
        } else if (tempElement == 4) {
            elementInfo.innerHTML = "People of the Earth element and a Sheep year are righteous, honest, straightforward, and will never harm their friends.<br>They are popular among their friends due to their kindness and righteousness.<br><br>They are able to overcome all kinds of difficulties in their careers due to the unexpected help and support from magnates.<br>When it comes to making their fortune, Earth Sheep cannot be too careful when investing in some projects because they could produce exactly the opposite results, so they must be very rational when making a financial decision.<br><br>The Destiny of Earth Sheep: Ordinary"
        }
        
    }
}

function splitInput(number) {
    let tempYear
    
    tempYear = number.split(".")
    if (tempYear.length > 1) {
        tempYear[0] += "."
        tempYear = tempYear.join("")
        return tempYear.replace(/[^1234567890]|\-/g, "")
    }
    return number.replace(/[^1234567890]|\-/g, "")
}

function zodiacYear(year) {
    let zodiac
    if (year%12 == 0) {
        return zodiac = "0"
    } else if (year%12 == 1) {
        return zodiac = "1"
    } else if(year%12 == 2) {
        return zodiac = "2"
    } else if(year%12 == 3) {
        return zodiac = "3"
    } else if(year%12 == 4) {
        return zodiac = "4"
    } else if(year%12 == 5) {
        return zodiac = "5"
    } else if(year%12 == 6) {
        return zodiac = "6"
    } else if(year%12 == 7) {
        return zodiac = "7"
    } else if(year%12 == 8) {
        return zodiac = "8"
    } else if(year%12 == 9) {
        return zodiac = "9"
    } else if(year%12 == 10) {
        return zodiac = "10"
    } else {
        return zodiac = "11"
    }
}

function elementYear(year) {
    let element
    
    if (year%10 == 0) {
        return element = "0"
    } else if (year%10 == 1) {
        return element = "0"
    } else if(year%10 == 2) {
        return element = "1"
    } else if(year%10 == 3) {
        return element = "1"
    } else if(year%10 == 4) {
        return element = "2"
    } else if(year%10 == 5) {
        return element = "2"
    } else if(year%10 == 6) {
        return element = "3"
    } else if(year%10 == 7) {
        return element = "3"
    } else if(year%10 == 8) {
        return element = "4"
    } else {
        return element = "4"
    }
}