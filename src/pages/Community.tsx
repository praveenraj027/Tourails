import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Volume2, VolumeX } from "lucide-react";

const stories = [
  { id: 1, user: "Sarah", avatar: "S", hasNew: true },
  { id: 2, user: "Mike", avatar: "M", hasNew: true },
  { id: 3, user: "Emma", avatar: "E", hasNew: true },
  { id: 4, user: "John", avatar: "J", hasNew: false },
  { id: 5, user: "Lisa", avatar: "L", hasNew: true },
  { id: 6, user: "Alex", avatar: "A", hasNew: false },
];

const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "S",
      location: "Bali, Indonesia",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    caption: "Found paradise in Ubud 🌴✨ The rice terraces here are absolutely breathtaking. This is why I travel!",
    likes: 2341,
    comments: 89,
    timeAgo: "2 hours ago",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "M",
      location: "Santorini, Greece",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    caption: "Sunset views from Oia 🌅 Every evening is a masterpiece here. If you haven't visited Santorini, add it to your bucket list!",
    likes: 4521,
    comments: 156,
    timeAgo: "5 hours ago",
    isLiked: true,
    isSaved: true,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "E",
      location: "Tokyo, Japan",
      verified: false,
    },
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    caption: "The perfect blend of tradition and modernity 🗼 Tokyo never fails to amaze me with its contrast of ancient temples and futuristic technology.",
    likes: 3892,
    comments: 124,
    timeAgo: "8 hours ago",
    isLiked: false,
    isSaved: false,
  },
];

const Community = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([2]);
  const [savedPosts, setSavedPosts] = useState<number[]>([2]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          {/* Stories */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 overflow-x-auto"
          >
            <div className="flex items-center gap-4 pb-2">
              {/* Add Story */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent p-0.5">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-2xl">+</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Your Story</span>
              </motion.button>

              {/* Other Stories */}
              {stories.map((story) => (
                <motion.button
                  key={story.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <div
                    className={`w-16 h-16 rounded-full p-0.5 ${
                      story.hasNew
                        ? "bg-gradient-to-br from-accent to-secondary"
                        : "bg-border"
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {story.avatar}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{story.user}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Feed */}
          <section className="space-y-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{post.user.name}</span>
                        {post.user.verified && (
                          <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-[10px] text-secondary-foreground">✓</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.user.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                {/* Image */}
                <div className="relative aspect-square">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleLike(post.id)}
                        className="group"
                      >
                        <Heart
                          className={`w-6 h-6 transition-colors ${
                            likedPosts.includes(post.id)
                              ? "fill-accent text-accent"
                              : "text-foreground group-hover:text-accent"
                          }`}
                        />
                      </motion.button>
                      <button className="hover:text-secondary transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="hover:text-secondary transition-colors">
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => toggleSave(post.id)}
                    >
                      <Bookmark
                        className={`w-6 h-6 transition-colors ${
                          savedPosts.includes(post.id)
                            ? "fill-secondary text-secondary"
                            : "text-foreground hover:text-secondary"
                        }`}
                      />
                    </motion.button>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-sm">
                      {(post.likes + (likedPosts.includes(post.id) && !post.isLiked ? 1 : 0)).toLocaleString()} likes
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">{post.user.name}</span>{" "}
                      {post.caption}
                    </p>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      View all {post.comments} comments
                    </button>
                    <p className="text-xs text-muted-foreground uppercase">{post.timeAgo}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          {/* Load More */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-muted-foreground/30 border-t-secondary rounded-full"
              />
              Loading more posts...
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
