import Container from "../Ui/Container";

function PrivacyPolicy() {
    return (
        <Container>
            <section className="px-4 py-10 text-textGray">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Privacy Policy
                </h1>

                <div className="space-y-10">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            Last updated: 18/6/2025
                        </h3>
                        <p className="text-base leading-relaxed">
                            Thank you for using Towlio ("we", "us", or "our").
                            We are committed to protecting your personal
                            information and your right to privacy. This Privacy
                            Policy explains what information we collect, how we
                            use it, and what rights you have in relation to it.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            1. Information We Collect
                        </h3>
                        <p className="mb-2">
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <span className="font-semibold">
                                    Personal Information:
                                </span>{" "}
                                such as your name, email address, and password
                                when you register or log in.
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Usage Data:
                                </span>{" "}
                                information about how you use the application
                                (e.g., task creation, project usage).
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Device Data:
                                </span>{" "}
                                IP address, browser type, operating system (used
                                for analytics or debugging).
                            </li>
                        </ul>
                        <p className="mt-2">
                            We do not collect sensitive personal data unless
                            explicitly provided by you.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            2. How We Use Your Information
                        </h3>
                        <p className="mb-2">We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Provide and maintain the service</li>
                            <li>Authenticate users and manage accounts</li>
                            <li>Improve the platform based on usage</li>
                            <li>
                                Communicate with you (e.g., notifications or
                                support)
                            </li>
                            <li>Ensure security and prevent abuse</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            3. Sharing Your Information
                        </h3>
                        <p className="mb-2">
                            We do not sell or rent your personal data to third
                            parties.
                        </p>
                        <p className="mb-2">
                            We may share your data only in these cases:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                With service providers who help us run the app
                                (e.g., hosting or analytics)
                            </li>
                            <li>
                                When required by law (e.g., legal requests,
                                government authorities)
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            4. Data Retention
                        </h3>
                        <p>
                            We keep your personal data for as long as your
                            account is active or as needed to provide services.
                            You may request deletion of your account and data at
                            any time by contacting us.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            5. Your Rights
                        </h3>
                        <p className="mb-2">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                Access, update, or delete your personal data
                            </li>
                            <li>
                                Withdraw consent at any time (if applicable)
                            </li>
                            <li>
                                File a complaint with a data protection
                                authority
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            6. Cookies and Tracking
                        </h3>
                        <p>
                            We may use cookies or similar technologies to
                            improve user experience and analyze traffic. You can
                            disable cookies through your browser settings.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            7. Security
                        </h3>
                        <p>
                            We implement reasonable security measures to protect
                            your data. However, no method of transmission over
                            the internet is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            8. Changes to This Policy
                        </h3>
                        <p>
                            We may update this Privacy Policy occasionally.
                            Changes will be posted on this page with a revised
                            “Last Updated” date.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            9. Contact Us
                        </h3>
                        <p>
                            If you have any questions or concerns about this
                            Privacy Policy, feel free to contact us at:
                        </p>
                        <p className="mt-2">
                            📧{" "}
                            <span className="font-semibold">
                                admin@gmail.com
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default PrivacyPolicy;
