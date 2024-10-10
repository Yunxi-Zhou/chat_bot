function autoResizeInput(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    const aiResponses = [
        {
            name: "Dr. Lee (Methodologist)",
            response: "Let's start with research evidence. As we know, there are about 14,000 males with haemophilia A in the U.S. receiving care through the Haemophilia Treatment Center (HTC) network, which represents 70% of all haemophilia patients. However, that leaves 30% of the population receiving care outside of this network, in settings where specialized care may be lacking. We also see from the 2011 UDC data that nearly half of the patients are aged between 20-64, and a significant number have moderate to severe haemophilia, along with comorbidities like HIV and hepatitis C. Inhibitor presence is another issue, affecting 6.6% of patients."
        },
        {
            name: "Dr. Robert (Public Health Expert)",
            response: "I see your point, but we need to take a broader view here. Haemophilia is rare—20,000 people in the U.S. total. In terms of public health priorities, I'm not convinced this rises to the top. The disease is serious, but it affects a small percentage of the population, and we have so many competing priorities, especially in underserved populations. I'm not sure we can justify prioritizing this over other chronic or infectious diseases that impact millions of people."
        },
        {
            name: "Ms. Johnson (Patient Representative)",
            response: "But Dr. Robert, the patients who aren't in the HTC network face life-or-death situations when they don't get the right care. As a mother of a haemophilia patient, I can't tell you how important integrated care is. Non-specialists often don't know how to handle bleeds. Patients have to travel long distances just to get to a center. It may be a rare condition, but the impact on these families is enormous."
        },
        {
            name: "Dr. Robert (Public Health Expert)",
            response: "I understand that, Ms. Johnson, but we have limited resources. In terms of population-level health, is this really where we should be putting our resources? Only 30% of the haemophilia population is receiving non-integrated care. Most are already in the HTC network. Why not focus on those who are already in the system rather than expanding resources to bring everyone into the same model?"
        },
        {
            name: "Dr. Clark (Health Economist)",
            response: "I'd like to weigh in here. Dr. Robert has a valid point. From a resource allocation perspective, haemophilia is expensive. The treatments themselves, particularly clotting factor concentrates, are costly. Expanding integrated care would require significant funding to set up more HTCs, train more specialists, and ensure telemedicine reaches rural areas. Can we justify those costs given that most haemophilia patients are already in integrated care?"
        },
        {
            name: "Dr. Clark (Health Economist)",
            response: "That's a fair point, but we don't have conclusive data showing that integrated care will lead to substantial cost savings in haemophilia specifically. Most of our evidence comes from chronic diseases like COPD and asthma, which isn't a perfect comparison. The upfront costs could be massive, and we'd be gambling on long-term savings."
        },
        {
            name: "Ms. Johnson (Patient Representative)",
            response: "Even if we don't have perfect evidence, these families are dealing with crises all the time. It's exhausting and emotionally draining. The healthcare system needs to do better by them. We can't just ignore the 30% of patients who aren't getting the care they need because we're worried about costs."
        },
        {
            name: "Dr. Robert (Public Health Expert)",
            response: "I get that, but public health priorities are about maximizing the benefit for the greatest number of people. We have to consider this in context. Yes, haemophilia is serious, but when we have diseases that affect millions, how can we justify placing this issue at the same level?"
        },
        {
            name: "Dr. Lee (Methodologist)",
            response: "I understand both sides of the argument. While we don't have perfect data for haemophilia specifically, the indirect evidence suggests integrated care does improve outcomes and likely reduces costs for conditions that require complex, coordinated care. I agree that we need more direct research, but we also can't ignore the potential benefits. From an evidence perspective, this is a high-risk population, and the gaps in care could lead to severe, avoidable outcomes."
        },
        {
            name: "Dr. Clark (Health Economist)",
            response: "I'd still say it's not a top public health priority, but if we phrase it as a priority for a targeted intervention—focusing on that 30%—then we might be able to make the case for limited resources. A phased approach could limit the costs and allow us to gather more direct evidence over time."
        },
        {
            name: "Ms. Johnson (Patient Representative)",
            response: "I'd prefer a broader approach, but if it means those who need it most will get better care, then I can support that."
        },
        {
            name: "Dr. Robert (Public Health Expert)",
            response: "That sounds reasonable. Targeting the highest-risk patients makes more sense than a blanket recommendation for everyone."
        }
    ];

    let messageCount = 0;
    let aiResponseIndex = 0;

    function addMessage(content, sender, isTyping = false) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        messageContainer.classList.add(sender.toLowerCase().replace(/\s+/g, '-') + '-container');

        const senderElement = document.createElement('div');
        senderElement.classList.add('message-sender');
        senderElement.textContent = sender;
        messageContainer.appendChild(senderElement);

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender.toLowerCase().replace(/\s+/g, '-') + '-message');

        const textElement = document.createElement('div');
        textElement.classList.add('message-text');
        messageElement.appendChild(textElement);

        const timeElement = document.createElement('div');
        timeElement.classList.add('message-time');
        timeElement.textContent = new Date().toLocaleTimeString();
        messageElement.appendChild(timeElement);

        messageContainer.appendChild(messageElement);
        chatMessages.appendChild(messageContainer);

        if (isTyping) {
            return typeWriter(textElement, content, 0);
        } else {
            textElement.textContent = content;
            return Promise.resolve();
        }
    }

    function typeWriter(element, text, index) {
        return new Promise(resolve => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => typeWriter(element, text, index + 1).then(resolve), 1);
            } else {
                resolve();
            }
        });
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message && messageCount < 4) {
            await addMessage(message, 'Me');
            messageInput.value = '';
            
            if (messageCount < 3) {
                const responsesCount = messageCount === 0 ? 5 : (messageCount === 1 ? 4 : 3);
                for (let i = 0; i < responsesCount; i++) {
                    if (aiResponseIndex < aiResponses.length) {
                        await addMessage(aiResponses[aiResponseIndex].response, aiResponses[aiResponseIndex].name, true);
                        aiResponseIndex++;
                    }
                }
            } else {
                const endMessage = "End conversation";
                await Promise.all([
                    addMessage(endMessage, "Dr. Lee (Methodologist)", true),
                    addMessage(endMessage, "Dr. Robert (Public Health Expert)", true),
                    addMessage(endMessage, "Ms. Johnson (Patient Representative)", true),
                    addMessage(endMessage, "Dr. Clark (Health Economist)", true)
                ]);
                await addMessage("Chat ended. Thank you for your participation.", "System");
                messageInput.disabled = true;
                sendButton.disabled = true;
            }

            messageCount++;
        }
    }

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 防止换行
            sendMessage();
        }
    });

    messageInput.addEventListener('input', function() {
        autoResizeInput(this);
    });

    autoResizeInput(messageInput);

    // sendButton.addEventListener('click', sendMessage);
});