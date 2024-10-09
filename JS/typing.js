document.addEventListener('DOMContentLoaded', function() {
    const text = `JUDGMENT
The panel selects "Yes" for the problem being a priority, but it's framed as a targeted priority for the 30% of haemophilia patients outside the HTC network.

RESEARCH EVIDENCE
Based on 2010 U.S. census data, there are nearly 14,000 males with haemophilia A (Factor VIII deficiency) and B (Factor IX deficiency) receiving care through the nationwide HTC network; this represents 70% of the 20,000 males with haemophilia in the U.S. 30% of patients in the U.S. receive care outside of the HTC network [Soucie 2004; Baker 2013].

According to the 2011 UDC (Universal Data Collection) program data, the haemophilia A and B population in the U.S. has the following characteristics:
• Severity: mild – 28.5%, moderate – 22.6%, severe – 48.9%
• Inhibitor titer > 0.5: 6.6%
• Age: 2-19 years old - 47.9%, 20-64 years old – 49.1%, 65+ years old – 3%
• Comorbidities: HIV positive – 13.9%, hepatitis C positive – 45% 

ADDITIONAL CONSIDERATIONS
The discussion included resource allocation concerns, the potential for long-term cost savings, and the emotional burden on patients and families. A phased or targeted approach was suggested as a compromise.`;

    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const summaryButton = document.getElementById('summary-button');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            if (text[i] === '\n') {
                typingText.innerHTML += '<br>';
            } else {
                typingText.innerHTML += text[i];
            }
            i++;
            setTimeout(typeWriter, 1); // 改为1毫秒
        } else {
            cursor.style.display = 'none';
        }
    }

    summaryButton.addEventListener('click', function() {
        typingText.innerHTML = '';
        cursor.style.display = 'inline-block';
        i = 0;
        typeWriter();
        this.disabled = true;
    });
});