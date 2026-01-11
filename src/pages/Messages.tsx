import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Phone, Video, MoreVertical, Smile, Paperclip, Check, CheckCheck } from "lucide-react";

const conversations = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "S",
    lastMessage: "Can't wait to meet up in Bali! 🌴",
    time: "2m",
    unread: 3,
    online: true,
  },
  {
    id: 2,
    user: "Mike Johnson",
    avatar: "M",
    lastMessage: "The sunset was amazing today",
    time: "1h",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "E",
    lastMessage: "Thanks for the recommendations!",
    time: "3h",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    user: "Travel Group - Tokyo",
    avatar: "🗼",
    lastMessage: "Alex: Who's joining for dinner?",
    time: "5h",
    unread: 12,
    online: false,
    isGroup: true,
  },
];

const messages = [
  { id: 1, sender: "them", text: "Hey! How's your trip going?", time: "10:30 AM", status: "read" },
  { id: 2, sender: "me", text: "It's amazing! Just visited the rice terraces in Ubud 🌾", time: "10:32 AM", status: "read" },
  { id: 3, sender: "them", text: "Oh wow, that's on my bucket list! How long are you staying?", time: "10:33 AM", status: "read" },
  { id: 4, sender: "me", text: "Two more weeks! You should definitely come visit", time: "10:35 AM", status: "read" },
  { id: 5, sender: "them", text: "I might just do that! Are there any hostels you'd recommend?", time: "10:40 AM", status: "read" },
  { id: 6, sender: "me", text: "Yes! I'll send you a list of my favorites. The one I'm staying at has the best rooftop pool", time: "10:42 AM", status: "delivered" },
  { id: 7, sender: "them", text: "Can't wait to meet up in Bali! 🌴", time: "10:45 AM", status: "delivered" },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Conversations List */}
      <aside className="w-80 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              variant="glass"
              className="pl-10 h-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <motion.button
              key={conv.id}
              whileHover={{ backgroundColor: "hsl(var(--muted))" }}
              onClick={() => setSelectedChat(conv.id)}
              className={`w-full p-4 flex items-center gap-3 transition-colors ${
                selectedChat === conv.id ? "bg-muted" : ""
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  conv.isGroup ? "bg-gradient-to-br from-accent to-secondary text-xl" : "bg-gradient-to-br from-primary to-secondary"
                }`}>
                  {conv.avatar}
                </div>
                {conv.online && !conv.isGroup && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{conv.user}</span>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="h-16 px-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                {selectedConversation?.avatar}
              </div>
              {selectedConversation?.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
              )}
            </div>
            <div>
              <h2 className="font-semibold">{selectedConversation?.user}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedConversation?.online ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.sender === "me"
                    ? "bg-secondary text-secondary-foreground rounded-br-md"
                    : "glass-card rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${
                  message.sender === "me" ? "justify-end" : ""
                }`}>
                  <span className="text-[10px] opacity-70">{message.time}</span>
                  {message.sender === "me" && (
                    message.status === "read" ? (
                      <CheckCheck className="w-3 h-3 text-blue-400" />
                    ) : (
                      <Check className="w-3 h-3 opacity-70" />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-1">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" type="button">
              <Smile className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              variant="glass"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="hero"
              size="icon"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Messages;
